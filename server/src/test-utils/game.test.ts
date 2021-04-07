// import { testConnection } from "./testConnection";
// import "reflect-metadata";
// import express from "express";
// import {
//   ApolloServer,
//   makeExecutableSchema,
//   PubSub,
// } from "apollo-server-express";
// import gql from "graphql-tag";
// // import { } from "apollo-server";
// import { buildTypeDefsAndResolvers } from "type-graphql";
// import { MyContext } from "../types";
// import { PlayerResolver } from "../resolvers/player";
// import { GameResolver } from "../resolvers/game";
// // import { GameResolver, GameResponse } from "../resolvers/game";
// import { COOKIE_NAME, PORT, __prod__ } from "../constants";
// import session from "express-session";
// import connectRedis from "connect-redis";
// import redis from "redis";
// import { PromptResolver } from "../resolvers/prompt";
// import { createServer } from "http";
// import { SubscriptionResolver } from "../resolvers/subscription";

import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { graphqlTestCall } from "./gCall";
import { testConnection } from "./testConnection";

// import { createTestClient } from "apollo-server-integration-testing";
// import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";

const createGameMutation = `
  mutation Create($game_code: String!, $owner: String!) {
    create(options: { game_code: $game_code, owner: $owner }) {
      errors {
        field
        message
      }
      game {
        game_code
        owner
        players
      }
    }
  }
`;

// let apolloServer: ApolloServer;

// const createApolloServer = async () => {
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

//   const pubsub = new PubSub();

//   const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
//     resolvers: [
//       GameResolver,
//       PromptResolver,
//       PlayerResolver,
//       SubscriptionResolver,
//     ],
//   });

//   const schema = makeExecutableSchema({ typeDefs, resolvers });

//   const apolloServer = new ApolloServer({
//     schema,
//     context: async ({ req, res }): Promise<MyContext> => ({
//       em: orm.em,
//       req,
//       res,
//       pubsub,
//     }),
//   });

//   apolloServer.applyMiddleware({
//     app,
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//       allowedHeaders: ["Content-Type", "Authorization"],
//     },
//   });

//   const httpServer = createServer(app);
//   apolloServer.installSubscriptionHandlers(httpServer);

//   httpServer.listen({ port: PORT }, () => {
//     console.log(
//       `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
//     );
//     console.log(
//       `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
//     );
//   });

//   return apolloServer;
// };

let orm: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
  orm = await testConnection();
  // apolloServer = await createApolloServer();
});

afterAll(async () => {
  await orm.close();
});

it("createGame", async () => {
  // const { mutate } = createTestClient({
  //   apolloServer,
  // });

  const res = await graphqlTestCall(createGameMutation, orm, {
    game_code: "gamerroom9",
    owner: "thegamer",
  });
  // console.log(res);

  console.log(`${JSON.stringify(res)}`);

  // console.log(`HERE GAMER: ${JSON.stringify(result.game)}`);
  // expect(result.data.game?.owner).toEqual("thegamer");
});

// // let orm: MikroORM<IDatabaseDriver<Connection>>;
// // beforeAll(async () => {
// //   orm = await testConnection();
// // });

// // afterAll(async () => {
// //   await orm.close();
// // });

// // const createGameMutation = `
// // mutation Create($game_code: String!, $owner: String!) {
// //     create(options: { game_code: $game_code, owner: $owner }) {
// //       errors {
// //         field
// //         message
// //       }
// //       game {
// //         game_code
// //         owner
// //         players
// //       }
// //     }
// //   }
// //   `;

// // describe("Game", () => {
// //   it("create game", async () => {
// //     console.log("HERE");
// //     console.log(
// //       JSON.stringify(
// //         gCall({
// //           source: createGameMutation,
// //           variableValues: {
// //             game_code: "letsgame6",
// //             owner: "thegamer",
// //           },
// //           orm,
// //         })
// //       )
// //     );
// //   });
// // });
