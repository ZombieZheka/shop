import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "@/app/lib/zod";
import { getUserFromDb } from "@/app/lib/actions";
import { User } from '@/app/lib/definitions';

// import Awaitable

const config = {
  debug: true,
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
    signOut: '/auth/signout',
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize?: ((credentials: Partial<Record<"email" | "password", unknown>>, request: Request) => Awaitable<User | null>) | undefined
      authorize: async (credentials : Partial<Record<"email" | "password", unknown>>) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          // logic to verify if the user exists
          const user = await getUserFromDb(email);
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            return null;
          }
          // return user object with their profile data
          if (await bcrypt.compare(password, user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
      // profile(profile: { role: string }) {
      //   return { role: profile.role ?? "user" };
      // },
    }),
  ],
  callbacks: {
    authorized({ auth, request: {nextUrl} }) {
      const user = auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // return user || !isOnDashboard;
      if (isOnDashboard) {
        if (user?.role === 'admin') {
          return true;
        }
        return false;
      } else {
        if (user) {
          return true;
        }
      }
      return false;
    },
    jwt({ token, user }) {
      if(user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    redirect({ url, baseUrl }) {
      // перенаправляємо на базовий URL або на інший шлях
      // return url.startsWith(baseUrl) ? url : baseUrl;
      return url === baseUrl + '/auth/signin' ? baseUrl : url;
    },
  }
} satisfies NextAuthConfig;

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth(config);