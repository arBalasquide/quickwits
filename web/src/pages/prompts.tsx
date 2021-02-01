import React from "react";
import { Center } from "@chakra-ui/react";
import Countdown from "../components/Countdown";
import Prompts from "../components/Prompts";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  return (
    <Center pt={10} width="100%">
      <Prompts />
    </Center>
  );
};

export default Index;
