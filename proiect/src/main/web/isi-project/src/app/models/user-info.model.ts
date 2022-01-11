export class UserInfoModel {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password: string | undefined;
  role: string | undefined;

  constructor(init?: Partial<UserInfoModel>) {
    Object.assign(this, init);
  }
}
