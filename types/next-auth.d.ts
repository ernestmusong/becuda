import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      phone: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      phone: string;
    };
  }
}
