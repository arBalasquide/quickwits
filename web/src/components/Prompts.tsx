import { Button, Text, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  PromptAndAnswer,
  usePlayerQuery,
  useAnswerMutation,
} from "../generated/graphql";
import { InputField } from "./InputField";

export const Prompts = ({}) => {
  const [prompts, setPrompts] = useState<PromptAndAnswer[]>([
    {
      prompt: "",
      answer: "",
    },
    {
      prompt: "",
      answer: "",
    },
  ]); // Render blank while loading prompts

  const [answerMutation] = useAnswerMutation();

  const { data } = usePlayerQuery();

  useEffect(() => {
    if (data && data.player) {
      setPrompts(data.player.prompts);
    }
  }, [data]);

  return (
    <Container>
      <Formik
        initialValues={{ answer1: "", answer2: "" }}
        onSubmit={async (values, { setErrors }) => {
          const answers = await answerMutation({
            variables: {
              answer1: values.answer1,
              answer2: values.answer2,
            },
          });
          if (!answers.data.answer) {
            // TODO: Better error handling
            console.log("Error occured while answering.");
          } else {
            // TODO: Trigger component to render waiting screen
            console.log("Answers submitted");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text>{prompts[0].prompt}</Text>
            <InputField
              color="black"
              name="answer1"
              label=""
              placeholder="Funny Answer 😂"
            />

            <Text pt={6}>{prompts[1].prompt}</Text>

            <InputField
              color="black"
              name="answer2"
              label=""
              placeholder="Funny Answer? 😳"
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
