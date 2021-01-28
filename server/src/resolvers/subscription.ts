import { NEW_PLAYER } from "../constants";
import { Arg, Subscription, Ctx } from "type-graphql";
import { Game } from "../entities/Game";
import { MyContext } from "src/types";

export class SubscriptionResolver {
  @Subscription(() => Game, {
    topics: NEW_PLAYER,
    filter: ({ payload, args }) => {
      return payload.game_code === args.game_code; // New player game_code === client's game_code
    },
  })
  async newPlayer(
    @Ctx() { em }: MyContext,
    @Arg("game_code") game_code: string
  ) {
    return await em.findOne(Game, { game_code });
  }
}
