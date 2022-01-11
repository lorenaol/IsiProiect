export class LoginDataModel {
  email: string | undefined;
  password: string | undefined;

  constructor(init?: Partial<LoginDataModel>) {
    Object.assign(this, init);
  }
}
