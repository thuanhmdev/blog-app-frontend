export {};
declare global {
  export enum EGENDER {
    "MALE",
    "FEMALE",
  }
  export type TUser = {
    id: string;
    name: string;
    username: string;
    gender: string;
    typeRole: string;
    picture: string;
    email?: string;
  };

  export type TLogin = {
    username: string;
    password: string;
  };

  export type TResponseUserLogin = {
    user: TUser;
    accessToken: string;
    refreshToken: string;
  };
}
