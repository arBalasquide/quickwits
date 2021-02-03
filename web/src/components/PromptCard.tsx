import { Box, Center, Container, SimpleGrid, Text } from "@chakra-ui/react";

const PromptCard = ({ prompt, answers }) => {
  return (
    <Container>
      <Center>
        <Text fontSize="xl" p={4}>
          {prompt}
        </Text>
      </Center>
      <SimpleGrid columns={[1, 2, 2]} spacing="1em">
        <Box
          _hover={{
            boxShadow: "outline",
          }}
          bgGradient="linear(to-t, purple.300, purple.400)"
          boxShadow="lg"
          borderRadius="md"
        >
          <Box fontSize="lg" p={8}>
            <Text>{answers[0]}</Text>
          </Box>
        </Box>
        <Box
          _hover={{
            boxShadow: "outline",
          }}
          bgGradient="linear(to-t, purple.300, purple.400)"
          boxShadow="lg"
          borderRadius="md"
        >
          <Box fontSize="lg" p={8}>
            {answers[1]}
          </Box>
        </Box>
      </SimpleGrid>
      <Center>
        <Text fontSize="md" p={4}>
          Choose your favorite answer!
        </Text>
      </Center>
    </Container>
  );
};

export default PromptCard;
