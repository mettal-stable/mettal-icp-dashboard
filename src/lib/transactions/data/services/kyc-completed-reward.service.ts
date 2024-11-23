import { FetchResult } from "@apollo/client";
import { ServiceException } from "@shared/application/exceptions/service.exception";
import {
  GraphqlRequestAdapter,
  IRequestPort,
} from "@shared/data/graphql.request.adapter";

export class KycCompletedRewardService {
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
      await this.adapter?.mutate(this.getQuery(), this.getVariables());
    } catch (error) {
      console.log(error);
    }
  }
  async parse(response: FetchResult<any>): Promise<any> {
    try {
      this.results = response?.data["KycCompletedReward"];
    } catch (error) {
      console.log(error);
      throw new ServiceException("Error parsing data");
    }
  }

  getVariables() {
    return {};
  }
  getQuery() {
    return `
       mutation Mutation {
        KycCompletedReward
       }
    `;
  }
}
