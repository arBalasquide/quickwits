import { useEffect, useState } from "react";
import getTimeUntil from "../utils/getTimeUntil";

export const Countdown = () => {
  // TODO: get deadline from database
  const deadline = new Date("2021-02-01");
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(deadline));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(getTimeUntil(deadline));
    }, 1000);  // TODO: clear with clearTimeout
    // Call function to alert deadline has passed if it has passed
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((field) => {
    if (!timeLeft[field]) return;

    timerComponents.push(
      <span>
        {timeLeft[field]} {field}{" "}
      </span>
    );
  });

  return (
    <div>
      <h1>Deadline: {deadline.toString()} </h1>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default Countdown;
