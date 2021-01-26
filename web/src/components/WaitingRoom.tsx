import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  useOnNewPlayerSubscription,
  usePlayerQuery,
} from "../generated/graphql";

export const WaitingRoom = ({}) => {
  const [game_code, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);

  const player = useOnNewPlayerSubscription({
    variables: {
      game_code: game_code,
    },
  });

  const {data, loading, error} = usePlayerQuery();

  useEffect(() => {
    if(data && data.player){
      setGameCode(data.player.game_code);
    }
    if(player && player.data){
      players.push(player.data.newPlayer.username)
      setPlayers(players)
    }
  }, [data,player])

  if(loading){
    return <div>Loading...</div>
  } else {
    return <div>{!!players ? players.join(",") : "No one is here :(."}</div>
  }

};

export default WaitingRoom;
