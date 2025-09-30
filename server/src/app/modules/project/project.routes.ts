import express from "express";
import { sendResponse } from "../../utils/sendResponse";
import Project from "./project.model";

const projectRouter = express.Router();

projectRouter.get("/",async(_req,res,_next)=>{
    sendResponse(res,{
        statusCode:200,
        message: "Project",
        data: await Project.find()
    })
})

export default projectRouter