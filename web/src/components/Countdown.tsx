import { Text } from "@chakra-ui/layout";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getTimeUntil from "../utils/getTimeUntil";

export const Countdown = ({ deadline }) => {
  // TODO: get deadline from database
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(deadline));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(getTimeUntil(deadline));
    }, 1000); // TODO: clear with clearTimeout
    // Call function to alert deadline has passed if it has passed
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((field) => {
    if (!timeLeft[field]) return;

    const color =
      field === "seconds" &&
      Object.keys(timeLeft).length === 1 &&
      timeLeft[field] <= 10
        ? "tomato"
        : "";

    timerComponents.push(
      <Flex align="center" mr={5}>
        <Heading color={color} as="h1" size="lg" letterSpacing={"-.1rem"}>
          {timeLeft[field]} {field}{" "}
        </Heading>
      </Flex>
    );
  });

  return (
    <>
      {/* <h1>Deadline: {deadline.toString()} </h1> */}
      {timerComponents.length ? (
        timerComponents
      ) : (
        <Heading color="tomato">Time's up!</Heading>
      )}
    </>
  );
};

export default Countdown;
