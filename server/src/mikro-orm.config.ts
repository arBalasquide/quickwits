import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Game } from "./entities/Game";
import { Player } from "./entities/Player";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Game, Player],
    dbName: "quickwits",
    type: "postgresql",
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];