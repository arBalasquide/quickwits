import { SimpleGrid, Text, Circle } from "@chakra-ui/react";

const createCirles = (players: [string]) => {
  let body = [];
  for (var i = 0; i < players.length; i++) {
    body.push(
      <Circle
        size="200px"
        bg="purple.500"
        boxShadow="md"
        borderWidth="2px"
        borderColor="black"
      >
        <Text fontSize="1.5em" color="black" isTruncated>
          {players[i]}
        </Text>
      </Circle>
    );
  }

  return body;
};

export const Players = ({ players }) => {
  return (
    <SimpleGrid columns={[1, 2, 4]} gap={6}>
      {createCirles(players)}
    </SimpleGrid>
  );
};

export default Players;
