import {Form, Formik} from "formik"
import React from "react"
import {useRouter} from "next/router";
import {useCreateMutation, useJoinMutation} from "../generated/graphql"
import {Box, Button, Center} from "@chakra-ui/react";
import {InputField} from "../components/InputField";
import {toErrorMap} from "../utils/toErrorMap";
import MyPopover from "../components/MyPopover";

interface joinProp {}

// TODO: Figure out how to split forms into their own component.
const Index: React.FC<joinProp> = ({}) => {
    const router = useRouter();

    const [joinMutation,] = useJoinMutation();
    const [createMutation,] = useCreateMutation();

    const JoinForm = () => {
        return (
            <Formik
                initialValues={{username: "", game_code: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await joinMutation({
                        variables: {
                            username: values.username,
                            game_code: values.game_code
                        }
                    });
                    if (response.data.join.errors) {
                        setErrors(toErrorMap(response.data.join.errors));
                    } else if (response.data?.join.player) {
                        router.push("/game")
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField name="username" label="Username" placeholder="Username" />
                        <Box mt={4}>
                            <InputField name="game_code" label="Game Code" placeholder="Game Code" />
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="blue">Join</Button>
                    </Form>
                )}
            </Formik>

        )
    }

    const CreateForm = () => {
        return (
            <Formik
                initialValues={{username: "", game_code: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const game = await createMutation({
                        variables: {
                            game_code: values.game_code,
                            owner: values.username,
                        }
                    })
                    if (game.data.create.errors) {
                        setErrors(toErrorMap(game.data.create.errors))
                    }
                    else {
                        const response = await joinMutation({
                            variables: {
                                username: values.username,
                                game_code: values.game_code
                            }
                        });
                        if (response.data.join.errors) {
                            setErrors(toErrorMap(response.data.join.errors));
                        } else if (response.data?.join.player) {
                            router.push("/game")
                        }
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField name="username" label="Username" placeholder="Username" />
                        <Box mt={4}>
                            <InputField name="game_code" label="Game Code" placeholder="Game Code" />
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="blue">Create</Button>
                    </Form>
                )}
            </Formik>

        )
    }
    return (
        <Center mt={10}>
            <MyPopover form={JoinForm} buttonName="Join Game" />
            <MyPopover form={CreateForm} buttonName="Create Game" />
        </Center>
    )
}

export default Index
