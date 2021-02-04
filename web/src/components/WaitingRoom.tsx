import { Center, Container } from "@chakra-ui/react";
import React from "react";
import Players from "./Players";
import StartButton from "./StartButton";

export const WaitingRoom = ({ players }) => {
  if (players !== []) {
    return (
      <Container width="100%">
        <Center p={20}>
          <StartButton />
          <Players players={players} />
        </Center>
      </Container>
    );
  }
};

export default WaitingRoom;
