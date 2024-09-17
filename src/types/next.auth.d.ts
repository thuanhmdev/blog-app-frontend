import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT extends TResponseUserLogin {
    accessExpireToken?: number;
    error: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: IUser;
    accessToken: string;
    refreshToken: string;
    accessExpireToken?: number;
    error: string;
  }
}
