import { Auth } from "@auth/domain/models/auth.model";
import { User } from "@auth/domain/models/user.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";
import { Identity } from "@dfinity/agent/lib/cjs/auth";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

export class ICPProvider implements IAuthPort {
  token?: string;
  user?: User;
  authClient?: AuthClient;
  identity?: Identity;
  iurl?: string;
  constructor() {
    this.iurl = import.meta.env.VITE_ICP_IDENTITY_ORIGIN;
  }

  async init() {
    await this.setClient();
  }

  async setClient() {
    this.authClient = await AuthClient.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return (await this.authClient?.isAuthenticated()) || false;
  }

  getIdentity(): Identity | undefined {
    return this.authClient?.getIdentity();
  }

  async getPrincipal(): Promise<Principal | undefined> {
    return this.authClient?.getIdentity()?.getPrincipal();
  }

  async geAuth(): Promise<Auth> {
    this.identity = this.authClient?.getIdentity();
    let token = this.identity?.getPrincipal().toText();

    return Auth.of({
      id: token,
      token: token,
      user: this.user,
    });
  }
  async login(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.authClient?.login({
        identityProvider: import.meta.env.VITE_ICP_IDENTITY_ORIGIN ?? null,
        windowOpenerFeatures:
          "toolbar=0,location=0,menubar=0,width=500,height=700,left=100,top=100",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  async logout() {
    await this.authClient?.logout();
  }
  signup(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
