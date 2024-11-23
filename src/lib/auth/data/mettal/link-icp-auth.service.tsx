import { FetchResult } from "@apollo/client";
import { ServiceException } from "@shared/application/exceptions/service.exception";

import {
  GraphqlRequestAdapter,
  IRequestPort,
} from "@shared/data/graphql.request.adapter";

export class LinkIcpAuthService {
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
    await this.adapter?.query(this.getQuery(), this.getVariables(), "no-cache");
  }
  async parse(response: FetchResult<any>): Promise<any> {
    try {
      this.results = response?.data["LinkIcpAuth"];
    } catch (error) {
      throw new ServiceException("Error parsing data");
    }
  }

  getVariables() {
    return {
      input: {
        access_token: this.input.access_token,
        email: this.input.email || "",
        principal: this.input.principal || "",
      },
    };
  }
  getQuery() {
    return `
        mutation LinkIcpAuth($input: LinkIcpAuthInputType!) {
           LinkIcpAuth(input: $input)
        }
    `;
  }
}
