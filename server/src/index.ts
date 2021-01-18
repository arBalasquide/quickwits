import "reflect-metadata";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext } from "./types";
import { PlayerResolver } from "./resolvers/player";
import { GameResolver } from "./resolvers/game";
import { COOKIE_NAME, PORT, __prod__ } from "./constants";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import { MikroORM } from "@mikro-orm/core";
import cors from "cors";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 2,
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__,
            },
            saveUninitialized: false,
            secret: "probably should keep this in an env file",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [GameResolver, PlayerResolver],
            validate: false
        }),
        context: ({req, res}): MyContext => ({ em: orm.em, req, res}),
    });
    
    apolloServer.applyMiddleware({
        app,
        cors: { 
            origin: 'http://localhost:3000',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    });

    app.listen(PORT, () => {
        console.log("Server started on localhost:", PORT);
    })
};

main().catch((err) => {
    console.log(err);
});