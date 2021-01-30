export const PORT = 4000;
export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";

export const MAX_PLAYERS = 8;
export const MAX_ROUNDS = 3;

export const SOCKET_PORT = 8000;

export const NEW_PLAYER = "NEW_PLAYER";

export const GAME_CHANGE = "GAME_CHANGE";
export const GAME_STATES = {
  ANSWERS: "answers",
  GAMEOVER: "gameover",
  VOTES: "votes",
  NEXT_ROUND: "next_round",
  DELETE: "delete",
  LOBBY: "lobby",
};
