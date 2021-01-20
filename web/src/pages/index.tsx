import { Form, Formik } from "formik"
import React from "react"
import { useRouter } from "next/router";
import { useCreateMutation, useJoinMutation } from "../generated/graphql"
import { Box, Button, Center } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";

interface joinProp { }

// TODO: Add 2nd button for creating a game, using the same Formik component
// I spent hours trying and couldnt get it to work :(
const Index: React.FC<joinProp> = ({}) => {
  const router = useRouter();
  const [joinMutation,] = useJoinMutation();
  //const [createMutation,] = useCreateMutation();
  
  return (
    <Center pt={10} width="100%">
      <Formik
      initialValues={{username: "", game_code: ""}}
      onSubmit={async (values, { setErrors }) => {
        const response = await joinMutation({variables: {
          username: values.username,
          game_code: values.game_code
        }});
        if(response.data.join.errors){
          setErrors(toErrorMap(response.data.join.errors));
        } else if(response.data?.join.player){
          router.push("/game")
        }
      }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" placeholder="Username"/>
            <Box mt={4}>
                <InputField name="game_code" label="Game Code" placeholder="Game Code"/>
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="blue">Join</Button>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

export default Index