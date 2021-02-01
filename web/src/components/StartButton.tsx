import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { StartGameDocument } from "../generated/graphql";

export const StartButton = () => {
  const [startGame, { loading }] = useMutation(StartGameDocument);
  return (
    <>
      <form
        onSubmit={() => {
          startGame({});
        }}
      >
        <Button
          colorScheme="blue"
          m={2}
          position="absolute"
          top={0}
          right={0}
          isLoading={loading}
          type="submit"
        >
          Start Game
        </Button>
      </form>
    </>
  );
};

export default StartButton;
