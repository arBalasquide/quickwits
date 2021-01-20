import socketIOClient from "socket.io-client";
import { SOCKET_URL } from "../config";

export const socket = socketIOClient(SOCKET_URL);
