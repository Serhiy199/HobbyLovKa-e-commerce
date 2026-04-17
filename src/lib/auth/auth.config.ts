import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "./password";
import { getUserByEmail } from "@/server/repositories/user.repository";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        const user = await getUserByEmail(email);
        if (!user?.passwordHash || !user.isActive) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          password,
          user.passwordHash,
        );
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.firstName = user.firstName;
        session.user.lastName = user.lastName;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
