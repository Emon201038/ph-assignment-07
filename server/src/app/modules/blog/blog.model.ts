import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";
import slugify from "slugify";

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required:[true,"Title is required"],
        trim: true,
        min:[2,"Title should minimum 2 charecter"]
    },
    slug:{
        type: String,
        required:[true,"Title is required"],
        trim: true,
        unique: true,
        min:[2,"Title should minimum 2 charecter"],
        set: function(v:string){
            return slugify(v)
        }
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:[true,"Author is required"]
    },
    content:{
        type: String,
        required:[true,"Content is required"],
        trim: true,
        min: [10,"Content should minimum 10 charecters long"]
    },
    tags: [String],
    category: String,
    coverImage: String,
    published: Boolean,
    likes: Number,
    views: Number,
    commentsCount: Number
},{
    timestamps:true
});

const Blog = model<IBlog>("Blog",blogSchema);

export default Blog