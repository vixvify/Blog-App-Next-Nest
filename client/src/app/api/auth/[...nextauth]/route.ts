import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/auth/login`,
            { email, password }
          );
          const foundUser = user.data.user;
          return {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            accesstoken: user.data.token,
          };
        } catch (err: any) {
          throw new Error(err.response?.data?.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.accesstoken = user.accesstoken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
        };
        session.accesstoken = token.accesstoken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
