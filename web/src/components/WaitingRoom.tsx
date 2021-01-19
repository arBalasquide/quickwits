import React from "react";
import { useMeQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/react"

export const WaitingRoom = ({ code }) => {
  const { data, loading, error } = useMeQuery();

  if(loading) return (
      <span>{loading ? <Spinner /> : <div></div>}</span>
  )

  return (
    <div>
      <span>{(data !== null && !!data) ? data.me.players.join(", ") : "empty!"}</span>
    </div>
  );
};
export default WaitingRoom;
