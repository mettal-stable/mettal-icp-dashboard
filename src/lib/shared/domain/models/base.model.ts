export class BaseModel {
  id?: any;
  name?: string;

  setId(value?: any) {
    this.id = value;
  }
  setName(value?: string) {
    this.name = value;
  }

  static of<V extends BaseModel, E>(this: new (data: E) => V, data: any): V {
    return new this(data);
  }
  isEqual(object: this) {
    return this?.id === object?.id;
  }
}
