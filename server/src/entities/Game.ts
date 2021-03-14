import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Deadline {
  @Field()
  state: string;

  @Field()
  deadline: Date;
}

@ObjectType()
class PlayerAndAnswer {
  @Field()
  username: string;
  @Field()
  answer: string;
}

@ObjectType()
export class PromptAndPlayer {
  @Field()
  prompt: string;
  @Field()
  player_one: PlayerAndAnswer;
  @Field()
  player_two: PlayerAndAnswer;
}

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

  @Field()
  @Property()
  state: string;

  @Field(() => [String])
  @Property()
  prompts: string[];

  @Field(() => [Deadline], { nullable: true })
  deadlines: Deadline[];

  @Field(() => [PromptAndPlayer], { nullable: true })
  @Property()
  promptPlayers: PromptAndPlayer[];
}
