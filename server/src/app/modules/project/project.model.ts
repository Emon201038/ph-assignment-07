import { model, Schema } from "mongoose";
import slugify from "slugify";
import { IDetails, IProject } from "./project.interface";
import cloudinary from "../../lib/cloudinary";

const detailsSchema = new Schema<IDetails>(
  {
    duration: {
      start: Date,
      end: Date,
    },
    features: [String],
    role: String,
    techStack: [String],
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },

    image: {
      url: String,
      public_id: String,
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
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Slug is required"],
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
    github: String,
    live: String,
  },
  {
    timestamps: true,
  }
);

function getPublicIdFromUrl(url: string): string {
  // Example: https://res.cloudinary.com/mycloud/image/upload/v1728200000/folder/my-image.jpg
  const parts = url.split("/");
  const filename = parts[parts.length - 1]; // skip: [https:, '', res.cloudinary.com, cloud, image, upload, v123...]
  return filename.replace(/\.[^/.]+$/, ""); // remove extension (.jpg, .png, etc.)
}

projectSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getFilter());
  if (doc.details?.image?.url) {
    const publicId =
      doc.details.image.pub_id || getPublicIdFromUrl(doc.details.image.url);
    await cloudinary.uploader.destroy(publicId);
  }
});

const Project = model<IProject>("Project", projectSchema);
export default Project;
