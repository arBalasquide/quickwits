import React, { useEffect, useState } from "react";
import Prompts from "../components/Prompts";
import Vote from "../components/Vote";
import { WaitingRoom } from "../components/WaitingRoom";
import { useMeQuery, useOnNewPlayerSubscription } from "../generated/graphql";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState(null);
  const [gameState, setGameState] = useState("");

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

  console.log(data, playersArr, gameCode, gameState);
  if (loading) {
    return <div>Loading...</div>;
  } else if (gameState === "lobby") {
    return <WaitingRoom players={players} />;
  } else if (gameState === "answers") {
    return <Prompts />;
  } else if (gameState === "votes") {
    return <Vote />;
  } else {
    return <div>You're not in a game.</div>;
  }
};

export default Index;
