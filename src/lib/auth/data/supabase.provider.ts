import { Auth } from "@auth/domain/models/auth.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseProvider implements IAuthPort {
  authClient?: SupabaseClient;
  identity?: any;
  async init(): Promise<void> {
    await this.setClient();
  }
  async setClient() {
    this.authClient = createClient(
      "https://aotnylglptrakgnjjuvi.supabase.co",
      import.meta.env.VITE_SUPABASE_KEY
    );
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      this.identity = await this.authClient?.auth.getSession();
      console.log(this.identity.data.session);
      return this.identity.data.session;
    } catch (error) {
      return false;
    }
  }
  async geAuth(): Promise<Auth> {
    //.then(({ data: { session } }) => {
    // setSession(session);
    // });
    await this.getMetalToken();

    // return Auth.of({
    //   id: this.identity?.getPrincipal().toText(),
    //   token: this.token,
    //   user: this.user,
    // });

    return Auth.of({});
  }
  login(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  signup(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getMetalToken(): Promise<void> {}
}
