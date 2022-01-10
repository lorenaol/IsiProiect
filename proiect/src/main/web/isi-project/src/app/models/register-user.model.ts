export class RegisterUserModel {
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  role: string | undefined;

  constructor(init?: Partial<RegisterUserModel>) {
    Object.assign(this, init);
  }
}
