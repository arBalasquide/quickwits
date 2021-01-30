import React, { useState } from "react";
import Players from "./Players";
import StartButton from "./StartButton";

export const WaitingRoom = ({ players }) => {
  // TODO: Loading screen. Start button should be component thats
  // always rendered
  if (players !== []) {
    return (
      <>
        <StartButton />
        <Players players={players} />
        );
      </>
    );
  }
};

export default WaitingRoom;
