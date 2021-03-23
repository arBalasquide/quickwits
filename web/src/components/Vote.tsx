import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PromptAndPlayer, useGetVotesQuery } from "../generated/graphql";
import PromptCard from "./PromptCard";

const Vote = ({}) => {
  // TODO: Voting mutation.
  // Don't allow player who answered prompt to vote for their own prompt.
  // Answers not showing up. Could just be because theres only one player.
  const [prompts, setPrompts] = useState<PromptAndPlayer>({
    prompt: "",
    player_one: { username: "", answer: "" },
    player_two: { username: "", answer: "" },
  });

  const { data } = useGetVotesQuery();

  useEffect(() => {
    if (data && data.getVotes) {
      setPrompts(data.getVotes);
    }
  }, [data]);

  return (
    <Container>
      <PromptCard
        prompt={prompts.prompt}
        playerOne={prompts.player_one}
        playerTwo={prompts.player_two}
      />
    </Container>
  );
};

export default Vote;
