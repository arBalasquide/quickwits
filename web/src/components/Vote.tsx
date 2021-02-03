import { Container } from "@chakra-ui/react";
import PromptCard from "./PromptCard";

const Vote = ({}) => {
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
