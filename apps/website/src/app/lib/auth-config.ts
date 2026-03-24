import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

function authorizeDemoCredentials(credentials?: {
  email?: string;
  password?: string;
}) {
  const email = credentials?.email?.trim().toLowerCase();
  const password = credentials?.password;

  if (!email || !password) {
    return null;
  }

  if (email !== "test@example.com" || password !== "x") {
    return null;
  }

  return {
    id: "test-user",
    email,
    name: "Test User",
    provider: "credentials",
  };
}

// Extend the default session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      provider?: string;
    };
  }

  interface User {
    id: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (
  !googleClientId ||
  !googleClientSecret ||
  !githubClientId ||
  !githubClientSecret
) {
  throw new Error("Missing OAuth environment variables");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return authorizeDemoCredentials(credentials ?? undefined);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
