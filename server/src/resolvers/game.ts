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

    // TODO: Error occured. Do not let game proceed.
    // Perhaps a big try catch for everything in this mutator
    if (!game) return false;

    // TODO: Timestamp/timer
    for (let i = 0; i < game.players.length; i++) {
      const username = game.players[i];
      const temp = await em.findOne(Player, {
        username,
        game_code: game.game_code,
      });
      // TODO: Make it so '!' is not needed
      temp!.prompts = [
        { prompt: game.prompts.pop()!, answer: "" },
        { prompt: game.prompts.pop()!, answer: "" },
      ];
      await em.persistAndFlush(temp!); // TODO: NO TO '!'
    }

    game.state = GAME_STATES.ANSWERS;
    em.persistAndFlush(game);
    return true;
  }
}
