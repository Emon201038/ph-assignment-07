export interface IProject {
  _id: number;
  title: string;
  slug: string;
  description: string;

  github: string;
  live: string;
  featured: boolean;
  details: {
    image: { url: string };
    techStack: string[];
    features: string[];
    tags: string[];
    role: string;
    duration: {
      start: string;
      end: string;
    };
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
  success: boolean;
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

export interface IAdminStats {
  totalProjects: number;
  totalBlogs: number;
  totalActiveProjects: number;
  totalPublishedBlogs: number;
  totalFeaturedBlogs: number;
  totalFeaturedProjects: number;
}
