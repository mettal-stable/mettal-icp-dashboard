import {
  ApolloError,
  FetchPolicy,
  FetchResult,
  Observable,
  gql,
} from "@apollo/client";
import { apolloClient } from "@shared/infra/graphql/apollo";

export interface IRequestPort<E extends Error> {
  response?: any;
  mutate(query: any, variable: any, context?: any): Promise<void | E>;
  query(query: any, variable: any, policy?: any): Promise<void | E>;
  suscribe(query: any, variable: any, onData?: Function): any;
}

export class ForbiddenRequestException extends Error {
  details?: string[] = [];
  code?: any;
  constructor(msg: string, details: string[] = [], code?: any) {
    super(msg);
    this.details = details;
    this.code = code;
    Object.setPrototypeOf(this, ForbiddenRequestException.prototype);
  }
}

export class ApolloRequestAdapterException extends Error {
  details?: string[] = [];
  code?: any;
  constructor(msg: string, details: string[] = [], code?: any) {
    super(msg);
    this.details = details;
    this.code = code;
    Object.setPrototypeOf(this, ApolloRequestAdapterException.prototype);
  }
}

export class GraphqlRequestAdapter<E extends Error> {
  response?: FetchResult<any>;
  validateToken = () => {};
  catch(error: any) {
    let code = "ERROR";
    let errors: any[] = [];
    let m = error.message || "Server request error";

    if (error instanceof ApolloError) {
      if (error.graphQLErrors.length === 1) {
        let e: any = error.graphQLErrors[0];
        code = e?.code || "ERROR";
        if (code === "FORBIDDEN") {
          throw new ForbiddenRequestException(e.message, [], "Exception");
        }
      }
      for (let x in error?.graphQLErrors) {
        errors.push(error.graphQLErrors[x]);
      }

      throw new ApolloRequestAdapterException(m, errors, code) as E;
    }
    throw new ApolloRequestAdapterException(m, [], code) as E;
  }
  mutate = async (
    input: any,
    variables: any,
    context?: any
  ): Promise<void | E> => {
    try {
      this.validateToken();
      this.response = await apolloClient.mutate({
        mutation: this.gql(input),
        variables,
        context,
      });
    } catch (error: any) {
      this.catch(error);
    }
  };

  gql = (input: string) => {
    return gql`
      ${input}
    `;
  };

  query = async (
    input: any,
    variables: any,
    policy: FetchPolicy = "cache-first"
  ): Promise<void | E> => {
    try {
      this.validateToken();
      this.response = await apolloClient.query({
        query: this.gql(input),
        variables,
        fetchPolicy: policy,
      });
    } catch (error: any) {
      this.catch(error);
    }
  };

  suscribe = (
    input: any,
    variables: any
  ): Observable<FetchResult<any>> | E | undefined => {
    try {
      let client = apolloClient.subscribe({
        query: this.gql(input),
        variables,
      });

      return client;
    } catch (error: any) {
      this.catch(error);
    }
  };
}
