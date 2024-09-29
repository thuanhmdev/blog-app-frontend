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
    role: {
      id: string;
      name: string;
    };
    image: string;
    imageProvider: string;
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
