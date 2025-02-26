import { FetchResult } from "@apollo/client";
import { ServiceException } from "@shared/application/exceptions/service.exception";

import {
  GraphqlRequestAdapter,
  IRequestPort,
} from "@shared/data/graphql.request.adapter";

export class GetAccountService {
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
      this.results = response?.data["GetAccount"];
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
          query GetAccount {
            GetAccount {
              kyc {
                reason              
                status
                veredict
              }
                user{
                email
                name
                last_name
                id
              }
              wallets{
                balance
              balance_formated
              balance_with_decimals
              default
              name
              network
              actions{
                deposit
                withdraw
                buy
                sell  
                swap
              }
              limits{
                buy_amount
                sell_amount
              }
              }
            }
          }
    `;
  }
}
