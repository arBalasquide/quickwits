import React from "react";
import { useMeQuery } from "../generated/graphql";

export const WaitingRoom = ({ code }) => {
  const { data, loading, error } = useMeQuery();

  return (
    <div>
      <span>{loading ? <p>Loading ...</p> : <div></div>}</span>
      <span>{(data !== null && !!data) ? data.me.players.join(", ") : "empty!"}</span>
    </div>
  );
};
export default WaitingRoom;
