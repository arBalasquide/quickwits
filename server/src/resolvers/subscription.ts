import { NEW_PLAYER } from "../constants";
import { Arg, Root, Subscription } from "type-graphql";
import { Player } from "../entities/Player";

export class SubscriptionResolver {
  @Subscription(() => Player, {
    topics: NEW_PLAYER,
    filter: ({ payload, args }) => {
      return payload.game_code === args.code; // New player game_code === client's game_code
    },
  })
  newPlayer(
    @Root() { username, id, game_code }: Player,
    @Arg("code") _code: String,
  ) {
    return { username, id, game_code };
  }
}
