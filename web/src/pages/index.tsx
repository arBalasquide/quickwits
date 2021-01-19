import { Field, Form, Formik } from "formik"
import React from "react"
import { useRouter } from "next/router";
import { useJoinMutation } from "../generated/graphql"
import { Box, Button, Center, Input } from "@chakra-ui/react";

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
        if(!data) {
        } else if (data){
            // worked, go to next route
            router.push("/game");
        }
      }}
      >
        {({ values, isSubmitting, handleSubmit, handleChange}) => (
          <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="Username"
          />
          <Input
            placeholder="Game code"
            type="text"
            name="game_code"
            onChange={handleChange}
            value={values.game_code}
          />
      
          <Button type="submit" disabled={isSubmitting} colorScheme="green">
            Submit
          </Button>
        </Form>
        )}
      </Formik>
    </Center>
  )
}

export default Index
