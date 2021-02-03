import { EntityManager } from "@mikro-orm/postgresql";
import { Game } from "../entities/Game";
import { FieldError, MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Player } from "../entities/Player";
import { prompts } from "../content/prompts";
import { MAX_PLAYERS, GAME_STATES, MAX_ROUNDS } from "../constants";

@InputType()
class GameInput {
  @Field()
  game_code: string;
  @Field(() => String)
  owner: string;
}

@ObjectType()
class GameResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Game, { nullable: true })
  game?: Game;
}

@ObjectType()
class StateResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  state?: String;
}

// Shuffle array O(N) and grab prompts from the array
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.splice(0, MAX_PLAYERS * MAX_ROUNDS * 2 + 1);
};

@Resolver()
export class GameResolver {
  @Query(() => Game, { nullable: true })
  async me(@Ctx() { em, req }: MyContext) {
    const player = await em.findOne(Player, { id: req.session.userId });
    const game = await em.findOne(Game, { game_code: player?.game_code });
    return game;
  }

  @Mutation(() => GameResponse)
  async create(
    @Arg("options") options: GameInput,
    @Ctx() { em }: MyContext
  ): Promise<GameResponse> {
    let promptsArr = [...prompts];
    promptsArr = shuffleArray(promptsArr);

    let game;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(Game)
        .getKnexQuery()
        .insert({
          game_code: options.game_code,
          owner: options.owner,
          players: [],
          prompts: promptsArr,
          state: GAME_STATES.LOBBY,
        })
        .returning("*");
      game = result[0];
    } catch (err) {
      console.log(err);
      // TODO: Better error handling.
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "game_code",
              message: "Game already exists. Try joining instead.",
            },
          ],
        };
      }
    }

    return { game };
  }

  @Mutation(() => Boolean)
  async startGame(@Ctx() { em, req }: MyContext) {
    const player = await em.findOne(Player, { id: req.session.userId });
    const game = await em.findOne(Game, { game_code: player?.game_code });

    // TODO: Handle errors better. Show in front-end what happened.
    if (!game) {
      console.log("Player: ", player, "Game: ", game, "req: ", req.session);
      return false;
    }

    // TODO: Shuffle players array for randomness.
    // Really ugly solution, fix plz.
    let firstPlayer;
    let temp: any;
    for (let i = 0; i < game.players.length; i++) {
      const username = game.players[i];
      if (!firstPlayer) {
        firstPlayer = await em.findOne(Player, {
          username,
          game_code: game.game_code,
        });

        if (!firstPlayer) return false;
        else {
          firstPlayer.prompts = [
            { prompt: game.prompts.pop()!, answer: "" },
            { prompt: game.prompts.pop()!, answer: "" },
          ];
          temp = firstPlayer;
        }
      } else if (i != game.players.length - 1) {
        const nextPlayer = await em.findOne(Player, {
          username,
          game_code: game.game_code,
        });

        nextPlayer!.prompts = [
          { prompt: temp!.prompts[1].prompt, answer: "" },
          { prompt: game.prompts.pop()!, answer: "" },
        ];
        temp = nextPlayer;
      } else {
        const nextPlayer = await em.findOne(Player, {
          username,
          game_code: game.game_code,
        });
        nextPlayer!.prompts = [
          { prompt: temp!.prompts[1].prompt, answer: "" },
          { prompt: firstPlayer.prompts[0].prompt, answer: "" },
        ];
      }

      await em.persistAndFlush(temp);
    }

    // Add timestamp to db
    let votingDeadline = new Date();
    votingDeadline = new Date(votingDeadline.getTime() + 1000 * 30);

    console.log("DEADLINES", game.deadlines);
    if (game.deadlines === null || game.deadlines === undefined)
      game.deadlines = [];
    game.deadlines.push({ state: GAME_STATES.VOTES, deadline: votingDeadline });

    // Callback to change state
    setTimeout(this.setState, 1000 * 30, game.game_code, GAME_STATES.VOTES, {
      em,
    });

    game.state = GAME_STATES.ANSWERS;
    em.persistAndFlush(game);

    return true;
  }

  // TODO: replace with nextState mutation, that does not require "state" parameter
  // nextState will increment the state when it notices that a state deadline has expired
  @Mutation(() => StateResponse)
  async setState(
    @Arg("game_code") game_code: string,
    @Arg("state") state: string,
    @Ctx() { em }: MyContext
  ): Promise<StateResponse> {
    const game = await em.findOne(Game, { game_code });

    if (!game)
      return {
        errors: [
          {
            field: "game_code",
            message: "Game does not exist",
          },
        ],
      };

    game.state = state;

    // Helper for nextState():
    // let state = "";
    // switch (game.state) {
    //   case GAME_STATES.LOBBY:
    //     state = GAME_STATES.ANSWERS;
    //     break;

    //   case GAME_STATES.ANSWERS:
    //     state = GAME_STATES.VOTES;
    //     break;

    //   case GAME_STATES.VOTES:
    //     state = GAME_STATES.GAMEOVER;
    //     break;

    //   case GAME_STATES.GAMEOVER:
    //     state = GAME_STATES.DELETE;
    //     break;

    //   default:
    //     state = GAME_STATES.DELETE;
    //     break;
    // }

    return { state };
  }
}
