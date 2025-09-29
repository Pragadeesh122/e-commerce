import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import bycrptjs from "bcryptjs";
import {createUserWithOauth, getUser} from "./supabase/helpers";

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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          const user = await getUser(credentials.email as string);
          if (!user) {
            throw new Error("Invalid Credentials");
          }
          
          if (!user.verified) {
            throw new Error("Please verify your email before logging in");
          }
          
          const isMatch = await bycrptjs.compare(
            credentials.password as string,
            user.password!
          );

          if (!isMatch) {
            throw new Error("Invalid Credentials");
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    authorized({auth, request}: {auth: any; request: any}) {
      return !!auth?.user;
    },
    async signIn({user}: {user: any}) {
      try {
        const existingGuest = await getUser(user.email as string);

        let authUser;

        if (!existingGuest) {
          authUser = {
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
            verified: true as boolean,
          };

          await createUserWithOauth(authUser);
        }

        return true;
      } catch (error: any) {
        console.error("Error in signIn callback:", error);
        return false;
      }
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
