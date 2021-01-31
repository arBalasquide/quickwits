import { Button, Text, Container } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { InputField } from "./InputField";

export const Prompts = ({ prompts }) => {
  return (
    <Container>
      <Formik
        initialValues={{ answer1: "", answer2: "" }}
        onSubmit={(values, actions) => {
          console.log(values); // TODO trigger answerPrompt mutation (pass values)
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text>{prompts[0]}</Text>
            <InputField
              name="answer1"
              label="answer1"
              placeholder="Funny Answer 😂"
            />

            <Text pt={6}>{prompts[1]}</Text>

            <InputField
              name="answer2"
              label="answer2"
              placeholder="Funny Answer Haha"
            />

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Submit Answers
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Prompts;
