import { Button, Text, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  PromptAndAnswer,
  usePlayerQuery,
  useAnswerMutation,
  useMeQuery,
  Deadline,
} from "../generated/graphql";
import Countdown from "./Countdown";
import { InputField } from "./InputField";

export const Prompts = ({}) => {
  const [promptOne, setPromptOne] = useState<PromptAndAnswer>({
    prompt: "",
    answer: "",
  });
  const [promptTwo, setPromptTwo] = useState<PromptAndAnswer>({
    prompt: "",
    answer: "",
  });

  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  const [answerMutation] = useAnswerMutation();

  const { data } = usePlayerQuery();
  const { data: me } = useMeQuery();

  useEffect(() => {
    if (data && data.player) {
      setPromptOne(data.player.prompt_one);
      setPromptTwo(data.player.prompt_two);
    }

    if (me && me.me && me.me.deadlines) {
      setDeadlines(me.me.deadlines);
    }
  }, [data, me.me.deadlines]);

  return (
    <Container p={10}>
      {deadlines.map((deadline) => (
        <Countdown deadline={deadline.deadline} />
      ))}
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
            <Text>{promptOne.prompt}</Text>
            <InputField
              color="black"
              name="answer1"
              label=""
              placeholder="Funny Answer 😂"
            />

            <Text pt={6}>{promptTwo.prompt}</Text>

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
              borderRadius="md"
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
