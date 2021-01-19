import { useMeQuery } from "../generated/graphql";

// Get room code from me query (based on cookie)
const getGameCode = async () => {
    const {data, loading, error} = useMeQuery();
    if(!data || !data.me) return null;
    else return data.me.game_code;
}

export default getGameCode;