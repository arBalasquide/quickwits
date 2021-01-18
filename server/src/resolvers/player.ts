import { EntityManager } from "@mikro-orm/postgresql";
import { Player } from "../entities/Player";
import { FieldError, MyContext } from "../types";
import { Resolver, Ctx, Mutation, Arg, InputType, Field, ObjectType } from "type-graphql";
import { Game } from "../entities/Game";

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
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => Player, {nullable: true})
    player?: Player;
}

@Resolver()
export class PlayerResolver {
    @Mutation(() => PlayerResponse)
    async join(
        @Arg("options") options: UserGameCodeInput,
        @Ctx() { em }: MyContext
    ): Promise<PlayerResponse> {
        if(options.username.length <= 2){
            return {
                errors: [{
                    field: "username",
                    message: "Username too short.",
                }],
            };
        }

        const game = await em.findOne(Game, {game_code: options.game_code})

        if(!game){
            return {
                errors: [{
                    field: "game_code",
                    message: "Game does not exist. Try creating it instead."
                }]
            }
        }

        let player;
        try {
            const result = await (em as EntityManager)
                .createQueryBuilder(Player)
                .getKnexQuery()
                .insert({
                    username: options.username,
                    game_code: options.game_code,
                })
                .returning("*")
            player = result[0];

            game.players.push(options.username);
            await em.flush();

        } catch(err){
            if(err.code === "23505") {
                return {
                    errors: [{
                        field: "username",
                        message: "Player already in that game. Choose a different name."
                    }],
                };
            }
        }

        return { player }
    }
}