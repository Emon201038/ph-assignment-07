export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: {
    name: string;
    url: string;
  }[];
  live: string;
  featured: boolean;
  details: {
    techStack: string[];
    features: string[];
    role: string;
    duration: string;
  };
}

export interface IUser {
  _id: string;
  name: string;
  role: UserRole;
  email: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";
