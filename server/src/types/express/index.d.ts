import "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload & {
      id?: string;
      email?: string;
      role?: string;
      name?: string;
    };
  }
}
