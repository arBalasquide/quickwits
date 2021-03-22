import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "../constants";
import { Game } from "../entities/Game";
import { Player } from "../entities/Player";
import { Prompt } from "../entities/Prompt";

// Clear out old schemas when new tests start
export const testConnection = async (drop: boolean = false) => {
  const orm = await MikroORM.init({
    // migrations: {
    //   path: path.join(__dirname, "./migrations"),
    //   pattern: /^[\w-]+\d+\.[tj]s$/,
    // },
    entities: [Game, Player, Prompt],
    dbName: "quickwits-test",
    type: "postgresql",
    debug: !__prod__,
  });

  // const dropDump = await generator.getDropSchemaSQL();
  // console.log(dropDump);

  // const createDump = await generator.getCreateSchemaSQL();
  // console.log(createDump);

  // const updateDump = await generator.getUpdateSchemaSQL();
  // console.log(updateDump);

  // if drop is true...
  if (drop) {
    const generator = orm.getSchemaGenerator();
    // await generator.dropSchema(undefined, undefined, true);
    await generator.dropSchema();
    await generator.createSchema();
    // await generator.updateSchema();
  }

  return orm;
};
