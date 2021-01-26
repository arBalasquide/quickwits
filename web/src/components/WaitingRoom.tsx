import React, {useEffect, useState} from "react";
import {
    useOnNewPlayerSubscription,
    usePlayerQuery,
} from "../generated/graphql";
import Players from "./Players";

export const WaitingRoom = ({}) => {
    const [game_code, setGameCode] = useState("");
    const [players, setPlayers] = useState([]);

    const player = useOnNewPlayerSubscription({
        variables: {
            game_code: game_code,
        },
    });

    const {data, loading} = usePlayerQuery();

    useEffect(() => {
        if (data && data.player) {
            setGameCode(data.player.game_code);
        }
        if (player && player.data) {
            players.push(player.data.newPlayer.username)
            setPlayers(players)
        }
    }, [data, player])

    if (loading) {
        return <div>Loading...</div>
    } else if (players !== []) {
        return (
            <Players players={players} />
        )
    }

};

export default WaitingRoom;
