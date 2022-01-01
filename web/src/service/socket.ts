import { HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { HOST, PORT } from "../config";

// It is not allowed to create a socket on the browser
// due to browsers already supporting their own sockets
// therefore, don't create socket on the browser side
const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://${HOST}:${PORT}/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: `http://${HOST}:${PORT}/graphql`,
  credentials: "include",
});

export const socketSplitLink = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httplink
    )
  : httplink;
