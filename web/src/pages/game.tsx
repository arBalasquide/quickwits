import React, { useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import { WaitingRoom } from "../components/WaitingRoom";
import { useMeQuery, useOnNewPlayerSubscription } from "../generated/graphql";

interface joinProp {}

const Index: React.FC<joinProp> = ({}) => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState(null);

  const playersArr = useOnNewPlayerSubscription({
    variables: {
      game_code: gameCode,
    },
  });

  // TODO: Handle loading and
  // load proper component on game state
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

  return (
    <Center pt={10} width="100%">
      <WaitingRoom players={players} />
    </Center>
  );
};

export default Index;
