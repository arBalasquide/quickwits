export const getTimeUntil = (date: Date) => {
  const difference = +date - +new Date(); // time left in ms
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }; // round each time field to an integer
  }

  return timeLeft;
};

export default getTimeUntil;
