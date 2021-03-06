import React from "react";
import { Center } from "@chakra-ui/react";
import Countdown from "../components/Countdown";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  return (
    <Center pt={10} width="100%">
      <Countdown deadline={new Date("2021-02-01")} />
    </Center>
  );
};

export default Index;
