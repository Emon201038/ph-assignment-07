"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const detailsSchema = new mongoose_1.Schema({
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
    tags: [String],
    image: {
        url: String,
        public_id: String,
    },
}, {
    versionKey: false,
    _id: false,
});
const projectSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
function getPublicIdFromUrl(url) {
    // Example: https://res.cloudinary.com/mycloud/image/upload/v1728200000/folder/my-image.jpg
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // skip: [https:, '', res.cloudinary.com, cloud, image, upload, v123...]
    return filename.replace(/\.[^/.]+$/, ""); // remove extension (.jpg, .png, etc.)
}
// Helper to create unique slug
function generateUniqueSlug(model, baseSlug, excludeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let slug = baseSlug;
        let counter = 1;
        while (yield model.exists(Object.assign({ slug }, (excludeId ? { _id: { $ne: excludeId } } : {})))) {
            slug = `${baseSlug}-${counter++}`;
        }
        return slug;
    });
}
// 🔹 Create slug before save
projectSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (this.isModified("title")) {
            const baseSlug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
            this.slug = yield generateUniqueSlug(this.constructor, baseSlug, (_a = this._id) === null || _a === void 0 ? void 0 : _a.toString());
        }
        next();
    });
});
// Update slug before findOneAndUpdate
projectSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const update = this.getUpdate();
        if (update.title) {
            const baseSlug = (0, slugify_1.default)(update.title, { lower: true, strict: true });
            const doc = yield this.model.findOne(this.getFilter());
            const newSlug = yield generateUniqueSlug(this.model, baseSlug, (_a = doc === null || doc === void 0 ? void 0 : doc._id) === null || _a === void 0 ? void 0 : _a.toString());
            this.set({ slug: newSlug });
        }
        next();
    });
});
projectSchema.pre("findOneAndDelete", function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const doc = yield this.model.findOne(this.getFilter());
        if ((_b = (_a = doc.details) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.url) {
            const publicId = doc.details.image.pub_id || getPublicIdFromUrl(doc.details.image.url);
            yield cloudinary_1.default.uploader.destroy(publicId);
        }
    });
});
const Project = (0, mongoose_1.model)("Project", projectSchema);
exports.default = Project;
