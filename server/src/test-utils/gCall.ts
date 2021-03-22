// import {
//   ApolloServer,
//   //   ApolloServer,
//   makeExecutableSchema,
//   PubSub,
// } from "apollo-server-express";
// import { graphql } from "graphql";
// import { GameResolver } from "../resolvers/game";
// import { PlayerResolver } from "../resolvers/player";
// import { PromptResolver } from "../resolvers/prompt";
// import { SubscriptionResolver } from "../resolvers/subscription";
// import { buildTypeDefsAndResolvers, Maybe } from "type-graphql";
// // import { MyContext } from "../types";
// import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
// import express from "express";
// import connectRedis from "connect-redis";
// import session from "express-session";
// import redis from "redis";
// import { COOKIE_NAME, __prod__ } from "../constants";
// import { MyContext } from "../types";
// import { createTestClient } from "apollo-server-integration-testing";
// // import { createServer } from "http";

// interface Options {
//   source: string;
//   variableValues: Maybe<{
//     [key: string]: any;
//   }>;
//   orm: MikroORM<IDatabaseDriver<Connection>>;
// }

// // Call graphql
// export const gCall = async ({ source, variableValues, orm }: Options) => {
//   const app = express();

//   const RedisStore = connectRedis(session);
//   const redisClient = redis.createClient();

//   app.use(
//     session({
//       name: COOKIE_NAME,
//       store: new RedisStore({
//         client: redisClient,
//         disableTouch: true,
//       }),
//       cookie: {
//         maxAge: 1000 * 60 * 60 * 2,
//         httpOnly: true,
//         sameSite: "lax", // csrf
//         secure: __prod__,
//       },
//       saveUninitialized: false,
//       secret: "probably should keep this in an env file",
//       resave: false,
//     })
//   );

//   const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
//     resolvers: [
//       GameResolver,
//       PromptResolver,
//       PlayerResolver,
//       SubscriptionResolver,
//     ],
//   });

//   const schema = makeExecutableSchema({ typeDefs, resolvers });
//   const pubsub = new PubSub();

//   const apolloServer: any = new ApolloServer({
//     typeDefs,
//     resolvers,
//     schema,
//     context: async ({ req, res }): Promise<MyContext> => ({
//       em: orm.em,
//       req,
//       res,
//       pubsub,
//     }),
 
//   const { query, mutate } = createTestClient(apolloServer);

//  });
// };
