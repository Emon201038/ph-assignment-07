import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IApiResponse, IUser, UserRole } from "./types";
import { cookies } from "next/headers";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: string;
    user: {
      id: string;
      email: string;
      role: UserRole;
      name: string;
    } & DefaultSession["user"];
  }
}

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------
// NextAuth Config
// ------------------
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(`${serverUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          });
          const data = (await res.json()) as IApiResponse<
            IUser & { token: string }
          >;
          if (!data.success) throw new Error(data.message);

          const loginData = data.data;

          (await cookies()).set("accessToken", loginData.token, {
            secure: true,
            sameSite: "none",
            httpOnly: true,
          });

          return {
            id: loginData._id,
            email: loginData.email,
            role: loginData.role,
            name: loginData.name,
            token: loginData.token,
          };
        } catch (err: any) {
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role;
        token.name = (user as any).name;
        token.token = (user as any).token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.token) {
        session.token = token.token as string;

        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as UserRole,
          name: token.name as string,
          emailVerified: new Date(),
        };
      }
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
