import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import ApiError from "../utils/apiError";
import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../utils/jwt";
import { envVars } from "../config/env";

interface ExtendedRequest extends Request {
    user: JwtPayload
}

export const checkAuth = (...roles: string[]) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.token || req.headers.authorization;
  if (!accessToken) {
    throw new ApiError(403, "You are not logged in.");
  };

//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     throw new ApiError(403, "You are not logged in.");
//   };

  const decoded = verifyJwt(accessToken, envVars.JWT_SECRET) as JwtPayload;
  if (!decoded) {
    throw new ApiError(403, "You are not logged in.");
  };

  if (!roles.includes(decoded.role)) {
    throw new ApiError(403, "You are not authorized to access this route.");
  };


  ( req as ExtendedRequest).user = decoded;
  next();
})