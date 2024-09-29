import { sendRequest } from "@/http/http";
import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const refreshAccessToken = async (token: JWT) => {
  const { statusCode, message, error, data } = await sendRequest<
    TResponse<TResponseUserLogin>
  >({
    url: `/blog-api/auth/refresh`,
    method: "POST",
    body: { refreshToken: token?.refreshToken },
  });
  if (statusCode <= 299) {
    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: token.refreshToken,
      user: data.user,
      accessExpireToken: jwtDecode(data?.accessToken).exp,
      error: "",
    };
  } else {
    return {
      ...token,
      error: "refreshAccessTokenError",
    };
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in width Admin",
      credentials: {
        username: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await sendRequest<TResponse<JWT>>({
          url: `/blog-api/admin/auth/login`,
          method: "POST",
          body: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        if (res && res.data) {
          return res.data as any;
        } else {
          throw new Error(res?.message as string);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    async jwt({ token, trigger, account, user, session }) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        const res = await sendRequest<TResponse<TResponseUserLogin>>({
          url: `/blog-api/auth/social-media`,
          method: "POST",
          body: {
            provider: account?.provider?.toLocaleUpperCase(),
            username: user.email,
            name: user.name,
            imageProvider: user.image,
          },
        });
        const { data } = res;

        if (data) {
          token.accessToken = data?.accessToken;
          token.refreshToken = data.refreshToken;
          token.user = data.user;
          token.accessExpireToken = jwtDecode(data?.accessToken).exp;
          token.error = "";
        }
      }

      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        const decodedJWT = jwtDecode(user?.accessToken);
        token = {
          ...token,
          //@ts-ignore
          accessToken: user.accessToken,
          //@ts-ignore
          refreshToken: user.refreshToken,
          //@ts-ignore
          user: user.user,
          accessExpireToken: decodedJWT.exp,
        };
      }
      if (
        token.accessExpireToken &&
        Date.now() > (token.accessExpireToken as number)
      ) {
        return refreshAccessToken(token);
      }
      return token;
      // Access token has expired, try to update it
    },

    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
        session.accessExpireToken = token.accessExpireToken;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    // signOut: "/auth/logout",
  },
};
