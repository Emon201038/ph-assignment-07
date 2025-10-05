import { Document } from "mongoose";

export interface IProject extends Document {
  id: number;
  title: string;
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
