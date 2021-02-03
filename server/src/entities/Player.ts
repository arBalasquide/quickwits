import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PromptAndAnswer {
  @Field()
  prompt: String;
  @Field()
  answer: String;
}

@ObjectType()
@Entity()
export class Player {
  @Field()
  @PrimaryKey()
  username!: string;

  @Field()
  @PrimaryKey()
  game_code!: string;

  @Field(() => String)
  @Property({ unique: true })
  id!: string;

  @Field(() => [PromptAndAnswer], { nullable: true })
  prompts: PromptAndAnswer[];
}
