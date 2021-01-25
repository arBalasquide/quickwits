import { NEW_PLAYER } from "../constants";
import { Root, Subscription } from "type-graphql";
import { Player } from "../entities/Player";

export class SubscriptionResolver {
  @Subscription(() => Player, {
    topics: NEW_PLAYER,
  })
  newPlayer(@Root() {username, id, game_code}: Player) {
    return {username, id, game_code};
  }
}