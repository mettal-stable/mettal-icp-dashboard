import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SessionService } from "@auth/application/services/session.service";
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getWallets: {
          keyArgs: ["data"],
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_GRAPHQL_URI}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  let persistence = new SessionService();
  let token = persistence.getTokenFromStore();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const additiveLink = from([authLink, httpLink]);

export const apolloClient = new ApolloClient({
  link: additiveLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
