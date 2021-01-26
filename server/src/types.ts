import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { PubSub } from "apollo-server-express";
import { Request, Response } from "express";
import { Field, ObjectType } from "type-graphql";
import { Player } from "./entities/Player";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: { userId?: string } };
  res: Response;
  pubsub: PubSub;
  connection: any; // TODO: Fix type.
};

export type Subscription = {
  newPlayer: Player;
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
