import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { WebSocketLink } from '@apollo/client/link/ws';

import theme from '../theme'
import { SubscriptionClient } from 'subscriptions-transport-ws';



function MyApp({ Component, pageProps }) {
  const wsLink = new SubscriptionClient(`ws://localhost:4000`, {
      reconnect: true
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
