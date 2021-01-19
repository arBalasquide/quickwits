import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Game } from "./entities/Game";
import { Player } from "./entities/Player";
import { Prompt } from "./entities/Prompt";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Game, Player, Prompt],
    dbName: "quickwits",
    type: "postgresql",
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];