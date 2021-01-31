import React, { useEffect, useState } from "react";
import Prompts from "../components/Prompts";
import { WaitingRoom } from "../components/WaitingRoom";
import { useMeQuery, useOnNewPlayerSubscription } from "../generated/graphql";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState(null);
  const [gameState, setGameState] = useState("");
  // TODO: Fetch this data from player
  const prompts = ["Donkey Kong Country", "Super Mario Sunshine, Yahoooooo"];
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
      setGameState(data.me.state);
    }
    if (playersArr && playersArr.data) {
      setPlayers(playersArr.data.newPlayer.players);
    }
  }, [data, playersArr]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (gameState === "test") {
    return <WaitingRoom players={players} />;
  } else if (gameState === "lobby") {
    return <Prompts prompts={prompts} />;
  } else {
    return <div>You're not in a game.</div>;
  }
};

export default Index;
