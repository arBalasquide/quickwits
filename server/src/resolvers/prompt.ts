import { Prompt } from "../entities/Prompt";
import { MyContext } from "../types";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PromptResolver {
    @Query(() => Prompt, {nullable: true})
    prompt(
        @Arg("id") id: number,
        @Ctx() { em }: MyContext,
    ) {
        const prompt = em.findOne(Prompt, {id: id})
        
        return prompt;
    }
}