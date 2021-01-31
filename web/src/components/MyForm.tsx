import { Formik, Form } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { InputField } from "../components/InputField";

// TODO: THIS WHOLE THING LOL FUCK ME
export const MyForm = ({ onSubmitFunc }) => {
  return (
    <Formik
      initialValues={{ username: "", game_code: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await onSubmitFunc(values.username, values.game_code);
        if (response.data.join.errors) {
          setErrors(toErrorMap(response.data.join.errors));
        } else if (response.data?.join.player) {
          router.push("/game");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="username" label="Username" placeholder="Username" />
          <Box mt={4}>
            <InputField
              name="game_code"
              label="Game Code"
              placeholder="Game Code"
            />
          </Box>
          <Button
            mt={4}
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
          >
            Join
          </Button>
        </Form>
      )}
    </Formik>
  );
};
