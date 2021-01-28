import React from "react";
import { Center } from "@chakra-ui/react";
import { WaitingRoom } from "../components/WaitingRoom";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  return (
    <Center pt={10} width="100%">
      <WaitingRoom />
    </Center>
  );
};

export default Index;
