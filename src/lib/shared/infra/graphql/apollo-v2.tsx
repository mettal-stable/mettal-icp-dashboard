import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { SessionService } from "@auth/application/services/session.service";
import { createClient } from "graphql-ws";

export class ApolloService {
  httpLink: any;
  wsLink: any;
  authLink: any;
  splitLink: any;
  additiveLink: any;
  client?: ApolloClient<any>;

  static client(): any {
    let apollo = new ApolloService();
    apollo.execute();

    return apollo.client;
  }
  execute() {
    this.client = new ApolloClient({
      link: this.splitLink,
      cache: new InMemoryCache({ addTypename: false }),
    });
  }

  setAdditiveLink() {
    this.additiveLink = from([this.authLink, this.httpLink]);
  }

  setSplitLink() {
    this.splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      this.wsLink,
      this.additiveLink
    );
  }

  setAuthLink() {
    this.authLink = setContext((_, { headers }) => {
      let persistence = new SessionService();
      const token = persistence.getTokenFromStore();
      console.log(token);
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token} 222` : "",
        },
      };
    });
  }

  setHttpLink() {
    this.httpLink = new HttpLink({
      uri: `${import.meta.env.VITE_GRAPHQL_PROTOCOL}://${
        import.meta.env.VITE_GRAPHQL_URI
      }/graphql`,
    });
  }
  setWsLinl() {
    this.wsLink = new GraphQLWsLink(
      createClient({
        url: `ws://${import.meta.env.VITE_GRAPHQL_URI.replace("http")}/graphql`,
      })
    );
  }
}
