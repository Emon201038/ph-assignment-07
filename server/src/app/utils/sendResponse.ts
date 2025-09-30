import { NextFunction, Request, Response } from "express";

export const sendResponse = <T>(res: Response,{
    statusCode=200,
    success=true,
    message="Success",
    data
}:{
    success?: boolean,
    statusCode?: number;
    message?: string;
    data?: T
}) =>{
    res.status(statusCode).json({statusCode,success,message,data})
}