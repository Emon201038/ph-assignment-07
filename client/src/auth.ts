import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, UserRole } from "./types";
import { cookies } from "next/headers";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: IUser & DefaultSession["user"];
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
          const { data, errors } = await loginMutation({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (errors?.length) throw new Error(errors[0].message);

          const loginData = data.login;

          // If 2FA required → stop auth and redirect
          if (loginData.requires2FA) {
            throw new Error("TWO_FACTOR_REQUIRED");
          }

          (await cookies()).set("accessToken", loginData.accessToken, {
            secure: true,
            sameSite: "none",
            httpOnly: true,
          });
          (await cookies()).set("refreshToken", loginData.refreshToken, {
            secure: true,
            sameSite: "none",
            httpOnly: true,
          });

          return {
            id: loginData.user.id,
            email: loginData.user.email,
            phone: loginData.user.phone,
            role: loginData.user.role,
            firstName: loginData.user.firstName,
            lastName: loginData.user.lastName,
            fullName: loginData.user.fullName,
            username: loginData.user.username,
            profilePicture: loginData.user.profilePicture,
            coverPicture: loginData.user?.coverPicture,
            accessToken: loginData.accessToken,
            refreshToken: loginData.refreshToken,
          };
        } catch (err: any) {
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // will get ?error=...
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.phone = (user as any).phone;
        token.role = (user as any).role;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.fullName = (user as any).fullName;
        token.username = (user as any).username;
        token.profilePicture = (user as any).profilePicture;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;

        session.user = {
          _id: token.id as string,
          email: token.email as string,
          role: token.role as UserRole,
          name: token.name as string,
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
