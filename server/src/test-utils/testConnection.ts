import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "../constants";
// import { Game } from "../entities/Game";
// import { Player } from "../entities/Player";
// import { Prompt } from "../entities/Prompt";
import testMikroConfig from "./test-mikro-orm-config";

// Clear out old schemas when new tests start
export const testConnection = async () => {
  // const orm = await MikroORM.init({
  //   migrations: {
  //     path: "../migrations",
  //     pattern: /^[\w-]+\d+\.[tj]s$/,
  //   },
  //   entities: [Game, Player, Prompt],
  //   dbName: "quickwits-test",
  //   type: "postgresql",
  //   debug: !__prod__,
  // });

  const orm = await MikroORM.init(testMikroConfig);
  await orm.getMigrator().up();

  // const dropDump = await generator.getDropSchemaSQL();
  // console.log(dropDump);

  // const createDump = await generator.getCreateSchemaSQL();
  // console.log(createDump);

  // const updateDump = await generator.getUpdateSchemaSQL();
  // console.log(updateDump);

  // if drop is true...
  // if (drop) {
  // const generator = orm.getSchemaGenerator();
  // await generator.dropSchema(undefined, undefined, true);
  // await generator.dropSchema();
  // await generator.createSchema();
  // await generator.updateSchema();
  // }

  return orm;
};
