import { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Schema.Types.ObjectId;
  tags?: string[];
  image: {
    url: string;
    pub_id: string;
  };
  featured: boolean;
  views?: number;
  readTime: number;
  status: "active" | "draft" | "archived";
  createdAt: Date;
  updatedAt: Date;
}
