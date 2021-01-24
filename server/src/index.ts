import "reflect-metadata";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext } from "./types";
import { PlayerResolver } from "./resolvers/player";
import { GameResolver } from "./resolvers/game";
import {
  COOKIE_NAME,
  PORT,
  PROMPTS_PATH,
  SOCKET_PORT,
  __prod__,
} from "./constants";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import { MikroORM } from "@mikro-orm/core";
import { getPrompts } from "./utils/getPrompts";
import { PromptResolver } from "./resolvers/prompt";
import { Game } from "./entities/Game";
import { Socket } from "socket.io";
import { createServer } from "http";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  await getPrompts(PROMPTS_PATH, orm.em);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  const getPlayers = async (game_code: string) => {
    const game = await orm.em.findOne(Game, { game_code: game_code });
    if (!game) {
      return null;
    } else {
      return game.players;
    }
  };

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
        sameSite: "lax", // csrf
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "probably should keep this in an env file",
      resave: false,
    })
  );

  const pubsub = new PubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GameResolver, PlayerResolver, PromptResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, pubsub }),
  });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: PORT }, () =>{
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
  })

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  // const http = app.listen(PORT, () => {
  //   console.log("Server started on localhost:", PORT);
  // });

  // const io = require("socket.io")(http, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //     methods: ["GET", "POST"],
  //   },
  //   wsEngine: "ws",
  // });

  // console.log("Socket.io listening on port ", SOCKET_PORT);

  // io.on("connection", (socket: Socket) => {
  //   socket.on("getPlayers", (interval: number, code: string) => {
  //     setInterval(async () => {
  //       socket.emit("players", await getPlayers(code));
  //     }, interval);
  //   });
  // });
};

main().catch((err) => {
  console.log(err);
});
