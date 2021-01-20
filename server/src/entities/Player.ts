import { Entity, PrimaryKey } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Player {
    @Field()
    @PrimaryKey()
    username!: string;

    @Field()
    @PrimaryKey()
    game_code!: string;

}