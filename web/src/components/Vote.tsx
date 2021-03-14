import { Container } from "@chakra-ui/react";
import PromptCard from "./PromptCard";

const Vote = ({}) => {
  //TODO: Query to fetch current prompt and answers
  // Game object should store these values
  // Would have to edit Player entities and prompts componenet
  // In order to save things correctly.
  return (
    <Container>
      <PromptCard
        prompt="Why is the moon yellow during nighttime?"
        answers={[
          "Funny answer lol!",
          "Probably another funny answer like this!",
        ]}
      />
    </Container>
  );
};

export default Vote;
