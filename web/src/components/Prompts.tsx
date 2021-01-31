import { Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { InputField } from "./InputField";

export const Prompts = ({ prompt }) => {
  return (
    <div>
      <h1>{prompt}</h1>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(values, actions) => {
          console.log(values); // TODO trigger answerPrompt mutation (pass values)
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
    </div>
  );
};

export default Prompts;
