import { BaseModel } from "@shared/domain/models/base.model";

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
}
export class User extends BaseModel implements IUser {
  email?: string;
  constructor(input?: IUser) {
    super();
    this.setId(input?.id);
    this.setName(input?.name);
    this.setEmail(input?.email);
  }

  setName(value?: string) {
    this.name = value;
  }
  setEmail(value?: string) {
    this.email = value;
  }
}
