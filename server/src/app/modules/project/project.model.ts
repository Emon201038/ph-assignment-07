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

// Helper to create unique slug
async function generateUniqueSlug(
  model: any,
  baseSlug: string,
  excludeId?: string
) {
  let slug = baseSlug;
  let counter = 1;

  while (
    await model.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}

// 🔹 Create slug before save
projectSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    this.slug = await generateUniqueSlug(
      this.constructor,
      baseSlug,
      this._id?.toString()
    );
  }
  next();
});

// Update slug before findOneAndUpdate
projectSchema.pre("findOneAndUpdate", async function (next) {
  const update: any = this.getUpdate();
  if (update.title) {
    const baseSlug = slugify(update.title, { lower: true, strict: true });
    const doc = await this.model.findOne(this.getFilter());
    const newSlug = await generateUniqueSlug(
      this.model,
      baseSlug,
      doc?._id?.toString()
    );
    this.set({ slug: newSlug });
  }
  next();
});

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
