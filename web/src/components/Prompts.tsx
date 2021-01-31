import { Button, Text, Container } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { InputField } from "./InputField";

export const Prompts = ({ prompts }) => {
  return (
    <Container>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(values, actions) => {
          console.log(values); // TODO trigger answerPrompt mutation (pass values)
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text>{prompts[0]}</Text>
            <InputField name="answer" label="Answer" placeholder="" />

            <Text>{prompts[1]}</Text>

            <InputField name="answer" label="Answer" placeholder="" />

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Prompts;
