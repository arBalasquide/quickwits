import { EntityManager } from "@mikro-orm/postgresql";
import { Player } from "../entities/Player";
import { FieldError, MyContext } from "../types";
import {
  Resolver,
  Ctx,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
  Query,
  PubSub,
  PubSubEngine,
} from "type-graphql";
import { Game } from "../entities/Game";
import { GAME_STATES, MAX_PLAYERS, NEW_PLAYER, __prod__ } from "../constants";

@InputType()
class UserGameCodeInput {
  @Field()
  username: string;
  @Field()
  game_code: string;
}

@InputType()
class Answers {
  @Field()
  answer1: string;
  @Field()
  answer2: string;
}

// TODO: Possibly can abstract this component. Used here and in the game resolver.
@ObjectType()
class PlayerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Player, { nullable: true })
  player?: Player;
}

@Resolver()
export class PlayerResolver {
  @Query(() => Player, { nullable: true })
  async player(@Ctx() { em, req }: MyContext) {
    // Hasn't joined a game yet
    if (!req.session.userId) {
      return null;
    }

    const player = await em.findOne(Player, { id: req.session.userId });

    return player;
  }

  @Mutation(() => PlayerResponse)
  async join(
    @Arg("options") options: UserGameCodeInput,
    @PubSub() pubsub: PubSubEngine,
    @Ctx() { em, req }: MyContext
  ): Promise<PlayerResponse> {
    const id = options.username + options.game_code;
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username too short.",
          },
        ],
      };
    }
    const game = await em.findOne(Game, { game_code: options.game_code });
    if (!game) {
      return {
        errors: [
          {
            field: "game_code",
            message: "Game does not exist. Try creating it instead.",
          },
        ],
      };
    }

    if (game.state !== GAME_STATES.LOBBY)
      return {
        errors: [
          {
            field: "state",
            message: "The game has already started.",
          },
        ],
      };

    if (__prod__ && game.players.length >= MAX_PLAYERS) {
      return {
        errors: [
          {
            field: "game_code",
            message: "Game is full.",
          },
        ],
      };
    }

    let player;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(Player)
        .getKnexQuery()
        .insert({
          username: options.username,
          game_code: options.game_code,
          id: id,
          prompt_one: { prompt: "", answer: "" },
          prompt_two: { prompt: "", answer: "" },
        })
        .returning("*");
      player = result[0];

      game.players.push(options.username);
      await em.flush();
    } catch (err) {
      const playerExists = err.code === "23505";
      if (playerExists) {
        const isValidCookie = req.session.userId === id;
        if (!isValidCookie) {
          return {
            errors: [
              {
                field: "username",
                message:
                  "Player already in that game. Choose a different name.",
              },
            ],
          };
        } else {
          return {
            player: {
              username: options.username,
              game_code: options.game_code,
              id: id,
              prompt_one: { prompt: "", answer: "" },
              prompt_two: { prompt: "", answer: "" },
            },
          };
        }
      }
    }

    req.session.userId = id;

    // Publish new player when they join (for newPlayer subscription)
    await pubsub.publish(NEW_PLAYER, {
      game_code: options.game_code,
    });

    return { player };
  }

  @Mutation(() => Boolean)
  async answer(
    @Arg("options") options: Answers,
    @Ctx() { em, req }: MyContext
  ) {
    const player = await em.findOne(Player, { id: req.session.userId });
    if (!player) return false;
    player.prompt_one.answer = options.answer1;
    player.prompt_two.answer = options.answer2;
    em.persistAndFlush(player);
    return true;
  }
}
