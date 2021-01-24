import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

export const WaitingRoom = ({}) => {
  const [players, setPlayers] = useState([]);
  const {loading, error, data } = useQuery(gql`query Me {
    me {
      game_code
      players
      owner
    }
  } `, {
    pollInterval: 5000
  })
  
  if (loading) return <div>"loading...";</div>
  if (error) return <div>`Error: ${error}`</div>

  if(!!data && !!data.me) { 
    for(var i=0; i < data.me.players.length; i++) {
      if(players[i] !== data.me.players[i])
        setPlayers(data.me.players);
    }
  }
  
  console.log(`Players: ${JSON.stringify(data)}`)

  return <div>{!!players ? players.join(",") : "No one has joined yet."}</div>;
};

export default WaitingRoom;

// import React, { useEffect, useState } from "react";
// import { socket } from "../service/socket";
// import getGameCode from "../utils/getGameCode";

// export const WaitingRoom = ({code}) => {
//   const [players, setPlayers] = useState([]);

//   useEffect(() => {
//     socket.emit("getPlayers", 100, code);
    
//     socket.on("players", (data) => {
//       setPlayers(data);
//     });
//   }, []);

//   return <div>{!!players ? players.join(",") : "No one has joined yet."}</div>;
// };

// export default WaitingRoom;

