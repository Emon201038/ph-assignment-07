import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";
import slugify from "slugify";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      min: [2, "Title should minimum 2 charecter"],
    },
    slug: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
      lowercase: true,
      min: [2, "Title should minimum 2 charecter"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      min: [10, "Content should minimum 10 charecters long"],
    },
    tags: [String],
    featured: Boolean,
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      trim: true,
      required: [true, "Read time is required"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "Read time should be greater than 0",
      },
    },
    image: {
      url: String,
      pub_id: String,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      min: [10, "Excerpt should minimum 10 charecters long"],
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
