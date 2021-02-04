import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { socketSplitLink } from "../service/socket";
import Header from "../components/MyHeader";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    link: socketSplitLink,
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Header />
        <ColorModeProvider
          options={{
            initialColorMode: "dark",
            useSystemColorMode: false,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
