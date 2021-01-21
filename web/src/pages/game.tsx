import React from "react"
import { useRouter } from "next/router";
import { Box, Button, Center, Input } from "@chakra-ui/react";
import { WaitingRoom } from "../components/WaitingRoom";
import getGameCode from "../utils/getGameCode";
import { useMeQuery } from "../generated/graphql";

interface joinProp { }

const Index: React.FC<joinProp> = ({}) => {
  const router = useRouter();

  return (
    <Center pt={10} width="100%">
        <WaitingRoom code={"test1"} />
    </Center>
  )
}

export default Index
