import React, { useEffect, useState } from "react";
import {
  useOnNewPlayerSubscription,
  usePlayerQuery,
} from "../generated/graphql";
import Players from "./Players";

export const WaitingRoom = ({}) => {
  const [game_code, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);

  const playersArr = useOnNewPlayerSubscription({
    variables: {
      game_code: game_code,
    },
  });

  const { data, loading } = usePlayerQuery();

  useEffect(() => {
    if (data && data.player) {
      setGameCode(data.player.game_code);
    }
    if (playersArr && playersArr.data) {
      setPlayers(playersArr.data.newPlayer.players);
    }
  }, [data, playersArr]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (players !== []) {
    return <Players players={players} />;
  }
};

export default WaitingRoom;
