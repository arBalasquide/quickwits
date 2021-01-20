import React, { useEffect, useState } from "react";
import { socket } from "../service/socket";

export const WaitingRoom = ({}) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("getPlayers", 100);
    
    socket.on("players", (data) => {
      setPlayers(data);
    });
  }, []);

  return <div>{!!players ? players.join(",") : "No one has joined yet."}</div>;
};

export default WaitingRoom;
