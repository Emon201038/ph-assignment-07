export interface IProject {
  _id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  details: {
    image: { url: string };
    techStack: string[];
    features: string[];
    role: string;
    duration: string;
    status: "active" | "draft" | "archived";
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

export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IMeta {
  totalResult: number;
  page: number;
  limit: number;
  totalPage: number;
}
