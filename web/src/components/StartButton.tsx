import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { StartGameDocument } from "../generated/graphql";

export const StartButton = () => {
  const [startGame] = useMutation(StartGameDocument);
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={async () => {
          const response = await startGame({});
          if (!response.data.startGame.errors) {
            router.push("/game");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Button
              p={5}
              bg="blue.300"
              m={2}
              position="absolute"
              top={0}
              right={0}
              isLoading={isSubmitting}
              type="submit"
              borderRadius="md"
            >
              Start Game
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StartButton;
