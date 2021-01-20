import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";

export const WaitingRoom = ({}) => {
  const socket = openSocket("ws://localhost:8000");
  const [players, setPlayers] = useState([]);

  socket.on("players", async (data) => {
    setPlayers(data);
  });
  socket.emit("getPlayers", 1000);
  return <div>{players.join(",")}</div>;
};

export default WaitingRoom;
