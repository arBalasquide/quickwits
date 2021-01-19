import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import fs from "fs"
import { Prompt } from "../entities/Prompt";

export const getPrompts = async (filePath: string, em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>) => {
    const arr = fs.readFileSync(filePath, "utf-8").split("\n");

    for(var i = 0; i < arr.length; i++){
        const prompt = new Prompt();
        const p = arr[i];
        prompt.prompt = p;

        try {
            const foundPrompt = await em.findOne(Prompt, {prompt: p});

            if(!foundPrompt){
               em.create(Prompt, {prompt: p})
               await em.persistAndFlush(prompt);
            }

        } catch(err){
            console.log(err)
        }
    }
}