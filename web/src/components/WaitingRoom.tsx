import React, { useState } from "react";
import { useOnNewPlayerSubscription } from "../generated/graphql";

export const WaitingRoom = ({}) => {
  const { data, loading, error } = useOnNewPlayerSubscription();
  
  return <div>{!!data ? data.newPlayer.username : "no players yet"}</div>;
};

export default WaitingRoom;