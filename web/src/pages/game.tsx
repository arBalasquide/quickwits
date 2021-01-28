import React from "react";
import { Center } from "@chakra-ui/react";
import { WaitingRoom } from "../components/WaitingRoom";
import StartButton from "../components/StartButton";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  return (
    <Center pt={10} width="100%">
      <WaitingRoom />
      <StartButton />
    </Center>
  );
};

export default Index;
