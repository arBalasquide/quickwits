import { EntityManager } from "@mikro-orm/postgresql";
import { Player } from "../entities/Player";
import { FieldError, MyContext } from "../types";
import { Resolver, Ctx, Mutation, Arg, InputType, Field, ObjectType, Query } from "type-graphql";
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
    @Query(() => Player, { nullable: true })
    async player(
        @Ctx() { em, req }: MyContext 
    ) {
        if(!req.session.userId){
            return null;
        }

        // TODO: Since id is not a primary key, find user by username and game code
        // If found already in game, validate cookie
        const user = await em.findOne(Player, {id: req.session.userId});
        return user;
    }

    @Mutation(() => PlayerResponse)
    async join(
        @Arg("options") options: UserGameCodeInput,
        @Ctx() { em, req }: MyContext
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
                    id: options.username,
                })
                .returning("*")
            player = result[0];

            game.players.push(options.username);
            await em.flush();

        } catch(err){
            console.log(err)
            if(err.code === "23505") {
                return {
                    errors: [{
                        field: "username",
                        message: "Player already in that game. Choose a different name."
                    }],
                };
            }
        }

        const id = player.username;
        req.session.userId = id;

        return { player }
    }
}