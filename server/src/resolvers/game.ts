import { EntityManager } from "@mikro-orm/postgresql";
import { Game } from "../entities/Game";
import { FieldError, MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Player } from "../entities/Player";

@InputType()
class GameInput {
    @Field()
    game_code: string;
    @Field(() => String)
    owner: string;
}

@ObjectType()
class GameResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => Game, {nullable: true})
    game?: Game;
}

@Resolver()
export class GameResolver {
    @Query(() => Game, {nullable: true})
    async me(
        @Ctx() { em, req }: MyContext,
    ){
        const player = await em.findOne(Player, {username: req.session.userId})
        const game = await em.findOne(Game, {game_code: player?.game_code})
        return game;
    }

    @Mutation(() => GameResponse)
    async create(
        @Arg("options") options: GameInput,
        @Ctx() { em }: MyContext
    ): Promise<GameResponse> {

        let game;
        try {
            const result = await (em as EntityManager)
                .createQueryBuilder(Game)
                .getKnexQuery()
                .insert({
                    game_code: options.game_code,
                    owner: options.owner,
                    players: [],
                })
                .returning("*");
            game = result[0];
        } catch(err) {
            if(err.code === "23505"){
                return {
                    errors: [{
                        field: "game_code",
                        message: "Game already exists. Try joining instead.",
                    }],
                };
            }
        }

        return { game };
    }
}