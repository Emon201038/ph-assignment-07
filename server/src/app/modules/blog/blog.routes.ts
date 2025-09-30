import express from "express";
import { sendResponse } from "../../utils/sendResponse";
import Blog from "./blog.model";

const blogRouter = express.Router();

blogRouter.get("/",async(_req,res,_next)=>{
    sendResponse(res,{
        statusCode:200,
        message: "Blogs retrived successfully",
        data: await Blog.find()
    })
})

export default blogRouter