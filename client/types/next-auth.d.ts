import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      email: string | null;
    } & DefaultSession["user"];
    accesstoken: string;
  }

  interface User {
    id: string;
    username: string | null;
    email: string | null;
    accesstoken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    email: string | null;
    accesstoken: string;
  }
}
