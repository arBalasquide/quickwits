import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Prompt {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field()
    @Property({unique: true})
    prompt!: string;
}