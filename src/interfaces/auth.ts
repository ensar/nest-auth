export interface IToken {
  access_token: string;
}

export interface IUser {
  username: string;
  email?: string;
  password: string;
  _id: string;
}
