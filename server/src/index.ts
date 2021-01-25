import "reflect-metadata";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer, makeExecutableSchema, PubSub } from "apollo-server-express";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { MyContext } from "./types";
import { PlayerResolver } from "./resolvers/player";
import { GameResolver } from "./resolvers/game";
import { COOKIE_NAME, PORT, PROMPTS_PATH, __prod__ } from "./constants";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import { MikroORM } from "@mikro-orm/core";
import { getPrompts } from "./utils/getPrompts";
import { PromptResolver } from "./resolvers/prompt";
import { createServer } from "http";
import { SubscriptionResolver } from "./resolvers/subscription";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  await getPrompts(PROMPTS_PATH, orm.em);

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
        sameSite: "lax", // csrf
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "probably should keep this in an env file",
      resave: false,
    })
  );

  const pubsub = new PubSub();

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [GameResolver, PromptResolver, PlayerResolver, SubscriptionResolver],
  });
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, pubsub }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
