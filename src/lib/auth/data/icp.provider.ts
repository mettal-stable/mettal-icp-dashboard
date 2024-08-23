import { Auth } from "@auth/domain/models/auth.model";
import { User } from "@auth/domain/models/user.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";
import { Identity } from "@dfinity/agent/lib/cjs/auth";

import { AuthClient } from "@dfinity/auth-client";

export class ICPProvider implements IAuthPort {
  token?: string;
  user?: User;
  authClient?: AuthClient;
  identity?: Identity;
  constructor() {}

  async init() {
    await this.setClient();
  }

  async setClient() {
    this.authClient = await AuthClient.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return (await this.authClient?.isAuthenticated()) || false;
  }

  async geAuth(): Promise<Auth> {
    this.identity = this.authClient?.getIdentity();
    await this.getMetalToken();

    return Auth.of({
      id: this.identity?.getPrincipal().toText(),
      token: this.token,
      user: this.user,
    });
  }
  async login(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.authClient?.login({
        windowOpenerFeatures:
          "toolbar=0,location=0,menubar=0,width=500,height=700,left=100,top=100",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        onSuccess: async () => {
          return resolve();
        },
        onError: async (e: any) => {
          console.log("error");
          return reject(e);
        },
      });
    });
  }

  async logout() {
    await this.authClient?.logout();
  }
  signup(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getMetalToken(): Promise<void> {}
}
