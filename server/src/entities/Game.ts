import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Game {
  @Field(() => String)
  @PrimaryKey()
  game_code!: string;

  @Field(() => [String])
  @Property()
  players: [string];

  @Field(() => String)
  @Property()
  owner!: string;

  @Field(() => [String])
  @Property()
  prompts!: [string];

  @Field()
  @Property()
  state: string;

  @Field()
  @Property()
  currentRound: number;
}
