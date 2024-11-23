import { FetchResult } from "@apollo/client";
import { ServiceException } from "@shared/application/exceptions/service.exception";

import {
  GraphqlRequestAdapter,
  IRequestPort,
} from "@shared/data/graphql.request.adapter";

export class ValidateOtpService {
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
      this.results = response?.data["ValidateOtp"];
    } catch (error) {
      console.log(error);
      throw new ServiceException("Error parsing data");
    }
  }

  getVariables() {
    return {
      input: {
        email: this.input.email,
        token: this.input.token,
      },
    };
  }
  getQuery() {
    return `
       mutation ValidateOtp($input: ValidateOtpInputType!) {
        ValidateOtp(input: $input) {
            access_token
            expires_at
            expires_in
            refresh_token
            token_type
            }
        }
    `;
  }
}
