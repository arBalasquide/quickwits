import "reflect-metadata";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MikroORM } from "@mikro-orm/core";
import { MyContext } from "./types";
import { PlayerResolver } from "./resolvers/player";
import { GameResolver } from "./resolvers/game";
import { PORT } from "./constants";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [GameResolver, PlayerResolver],
            validate: false
        }),
        context: ({req, res}): MyContext => ({ em: orm.em, req, res}),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(PORT, () => {
        console.log("Server started on localhost:", PORT);
    })
};

main().catch((err) => {
    console.log(err);
});