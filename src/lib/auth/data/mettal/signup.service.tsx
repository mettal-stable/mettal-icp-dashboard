import { FetchResult } from "@apollo/client";
import { ServiceException } from "@shared/application/exceptions/service.exception";

import {
  GraphqlRequestAdapter,
  IRequestPort,
} from "@shared/data/graphql.request.adapter";

export class SignupService {
  input?: any;
  adapter?: IRequestPort<ServiceException>;
  results: any;
  constructor() {
    this.adapter = new GraphqlRequestAdapter();
  }
  async execute(input?: any): Promise<any> {
    this.input = input;
    await this.request();
    await this.parse(this.adapter?.response!);
    return this.results;
  }

  async request() {
    try {
      await this.adapter?.query(
        this.getQuery(),
        this.getVariables(),
        "no-cache"
      );
    } catch (error) {
      console.log(error);
    }
  }
  async parse(response: FetchResult<any>): Promise<any> {
    try {
      this.results = response?.data["Signup"];
    } catch (error) {
      console.log(error);
      throw new ServiceException("Error parsing data");
    }
  }

  getVariables() {
    return {
      input: {
        email: this.input.email,
        last_name: this.input.last_name,
        name: this.input.name,
      },
    };
  }
  getQuery() {
    return `
         mutation Signup($input: SignupInputType!) {
            Signup(input: $input)
        }
    `;
  }
}
