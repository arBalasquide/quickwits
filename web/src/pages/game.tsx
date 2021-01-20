import React from "react"
import { useRouter } from "next/router";
import { Box, Button, Center, Input } from "@chakra-ui/react";
import { WaitingRoom } from "../components/WaitingRoom";
import getGameCode from "../utils/getGameCode";

interface joinProp { }

const Index: React.FC<joinProp> = ({}) => {
  const router = useRouter();
  return (
    <Center pt={10} width="100%">
        <WaitingRoom />
        {/* <Box m={2}>
        onSubmit={async values => {
        const response = await joinMutation({variables: { 
          username: values.username,
          game_code: values.game_code
        }});
        if(!data) {
        } else if (data){
            // worked, go to next route
            router.push("/game");
        }
      }}
        </Box> */}
    </Center>
  )
}

export default Index
