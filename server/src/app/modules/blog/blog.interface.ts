import { Document, Schema } from "mongoose";

export interface IBlog extends Document  {
  title: string;
  slug: string; 
  content: string;
  author: Schema.Types.ObjectId;
  tags?: string[];
  category?: string;
  coverImage?: string;
  published: boolean;
  likes?: number;
  views?: number;
  commentsCount?: number;
  readTime: string
}
