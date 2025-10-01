import express from "express"
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";

const authRouter = express.Router()

authRouter.post("/login",AuthController.login);
authRouter.get("/me",checkAuth(UserRole.SUPER_ADMIN,UserRole.ADMIN),AuthController.me)

export default authRouter