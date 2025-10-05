import { model, Schema } from "mongoose";
import { IDetails, IProject } from "./project.interface";

const detailsSchema = new Schema<IDetails>(
  {
    duration: {
      from: Date,
      to: Date,
    },
    features: [String],
    role: String,
    techStack: [String],
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      min: [2, "Title should minimum 2 charecter"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      min: [2, "description should minimum 2 charecter"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    details: detailsSchema,
  },
  {
    timestamps: true,
  }
);

const Project = model<IProject>("Project", projectSchema);
export default Project;
