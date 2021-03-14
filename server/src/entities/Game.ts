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
export class PromptAndPlayer {
  @Field()
  prompt: string;
  @Field()
  player1: string;
  @Field()
  player2: string;
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
  prompts: [string];

  @Field(() => [Deadline], { nullable: true })
  deadlines: Deadline[];

  @Field(() => [PromptAndPlayer], { nullable: true })
  prompt_dict: PromptAndPlayer[];
}
