import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bycrptjs from "bcryptjs";

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
    credentials({
      async authorize(credentials, request) {
        if (
          (credentials?.email as string) === null ||
          (credentials?.password as string) === null
        ) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email as string,
            },
          });
          if (user) {
            const isMatch = await bycrptjs.compare(
              credentials.password as string,
              user.password
            );

            if (isMatch) {
              return user as any;
            } else {
              throw new Error("Invalid Credentials");
            }
          }
        } catch (error: any) {
          return error.message;
        }
      },
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
} = NextAuth({
  session: {strategy: "jwt"},
  ...authConfig,
});
