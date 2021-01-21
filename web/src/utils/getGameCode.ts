import { useMeQuery } from "../generated/graphql";

// Get room code from me query (based on cookie)
const getGameCode = async () => {
    const {data, loading, error} = useMeQuery();
    return "test1";
}

export default getGameCode;