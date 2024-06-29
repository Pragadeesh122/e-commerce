import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {sign} from "crypto";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({auth, request}: {auth: any; request: any}) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: {GET, POST},
  signIn,
  signOut,
} = NextAuth(authConfig);
