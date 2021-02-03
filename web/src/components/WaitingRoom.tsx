import { Center } from "@chakra-ui/react";
import React from "react";
import Players from "./Players";
import StartButton from "./StartButton";

export const WaitingRoom = ({ players }) => {
  if (players !== []) {
    return (
      <Center pt={10} width="100%">
        <StartButton />
        <Players players={players} />
      </Center>
    );
  }
};

export default WaitingRoom;
