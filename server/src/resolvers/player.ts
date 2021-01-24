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
  Subscription,
} from "type-graphql";
import { Game } from "../entities/Game";
import { MAX_PLAYERS, NEW_PLAYER, __prod__ } from "../constants";

@InputType()
class UserGameCodeInput {
  @Field()
  username: string;
  @Field()
  game_code: string;
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
  async player(
    @Ctx() { em, req }: MyContext,
    @Arg("options") options: UserGameCodeInput
  ) {
    // Hasn't joined a game yet
    if (!req.session.userId) {
      return null;
    }

    const player = await em.findOne(Player, {
      username: options.username,
      game_code: options.game_code,
    });

    if (!player) {
      return null;
    } else if (player.username !== req.session.userId) {
      return {
        errors: [
          {
            field: "username",
            message:
              "No valid cookie found. Are you trying to play as someone else :)?",
          },
        ],
      };
    }

    return player;
  }

  @Mutation(() => PlayerResponse)
  async join(
    @Arg("options") options: UserGameCodeInput,
    @Ctx() { em, req, pubsub }: MyContext
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
          // Publish new player when they join (for newPlayer subscription)
          console.log(
            `Sending: ${JSON.stringify({
              newPlayer: {
                username: options.username,
                game_code: options.game_code,
                id,
              },
            })}`
          );
          pubsub.publish(NEW_PLAYER, {
            newPlayer: {
              username: options.username,
              game_code: options.game_code,
              id: id,
            },
          });
          return {
            player: {
              username: options.username,
              game_code: options.game_code,
              id: id,
            },
          };
        }
      }
    }

    req.session.userId = id;

    // Publish new player when they join (for newPlayer subscription)
    console.log(`Sending: ${JSON.stringify({ newPlayer: player })}`);
    pubsub.publish(NEW_PLAYER, {
      newPlayer: player,
    });

    return { player };
  }

  @Subscription(() => Player, {
    topics: NEW_PLAYER,
  })
  async newPlayer(
    @Ctx() { pubsub }: MyContext
  ): Promise<AsyncIterator<unknown, any, undefined>> {
    return pubsub.asyncIterator(NEW_PLAYER);
  }
}
