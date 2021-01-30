import {
  Container,
  Grid,
  Text,
  HStack,
  Circle,
  Center,
} from "@chakra-ui/react";

const createCirles = (players: [string]) => {
  let body = [];
  for (var i = 0; i < players.length; i++) {
    body.push(
      <Circle size="200px" bg="tomato" m={2}>
        <Text fontSize="1.5em" color="blue.900" isTruncated>
          {players[i]}
        </Text>
      </Circle>
    );
  }

  return <Center>{body}</Center>;
};

export const Players = ({ players }) => {
  return (
    <Container maxW={"80%"}>
      <Grid>
        <Center>
          <HStack>{createCirles(players)}</HStack>
        </Center>
      </Grid>
    </Container>
  );
};

export default Players;
