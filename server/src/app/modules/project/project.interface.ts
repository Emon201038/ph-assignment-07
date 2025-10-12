import { Document } from "mongoose";

export interface IProject extends Document {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  details: IDetails;
}

export interface IDetails {
  techStack: string[];
  features: string[];
  tags: string[];
  role: string;
  duration: {
    start: Date;
    end: Date;
  };
  status: "active" | "draft" | "archived";

  image: {
    url: string;
    public_id: string;
  };
}
