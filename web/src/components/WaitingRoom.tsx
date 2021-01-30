import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  useOnNewPlayerSubscription,
} from "../generated/graphql";
import Players from "./Players";

export const WaitingRoom = ({}) => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState(null);

  const playersArr = useOnNewPlayerSubscription({
    variables: {
      game_code: gameCode,
    },
  });

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (data && data.me) {
      setPlayers(data.me.players);
      setGameCode(data.me.game_code);
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
