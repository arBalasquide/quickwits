import React, { useEffect, useState } from "react";
import { socket } from "../service/socket";
import getGameCode from "../utils/getGameCode";

export const WaitingRoom = ({code}) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("getPlayers", 100, code);
    
    socket.on("players", (data) => {
      setPlayers(data);
    });
  }, []);

  return <div>{!!players ? players.join(",") : "No one has joined yet."}</div>;
};

export default WaitingRoom;
