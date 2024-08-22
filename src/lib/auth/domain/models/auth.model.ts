import { User } from "@auth/domain/models/user.model";
import { BaseModel } from "@shared/domain/models/base.model";

export interface IAuth {
  id?: string;
  token?: string;
  user?: User;
}

export class Auth extends BaseModel {
  token?: string;
  user?: User;

  constructor(input?: IAuth) {
    super();
    this.setId(input?.id);
    this.setToken(input?.token);
    this.setUser(input?.user);
  }
  setToken(value?: string) {
    this.token = value;
  }
  setUser(value?: User) {
    this.user = value;
  }
}
