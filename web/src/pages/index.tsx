import { Form, Formik } from "formik"
import React from "react"
import { useRouter } from "next/router";
import { useJoinMutation } from "../generated/graphql"
import { Box, Button, Center } from "@chakra-ui/react";
import { InputField } from "../components/InputField";

interface joinProp { }

const Index: React.FC<joinProp> = ({}) => {
  const router = useRouter();
  const [joinMutation, {data, loading, error}] = useJoinMutation();
  return (
    <Center pt={10} width="100%">
      <Formik
      initialValues={{username: "", game_code: ""}}
      onSubmit={async values => {
        const response = await joinMutation({variables: {
          username: values.username,
          game_code: values.game_code
        }});
        if(response.data.join.errors){
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
