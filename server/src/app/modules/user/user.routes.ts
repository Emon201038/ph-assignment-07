import express from "express";
import { sendResponse } from "../../utils/sendResponse";
import User from "./user.model";

const userRouter = express.Router();

userRouter.get("/",async(_req,res,_next)=>{
    sendResponse(res,{
        statusCode:200,
        message: "Users",
        data: await User.find()
    })
})

export default userRouter