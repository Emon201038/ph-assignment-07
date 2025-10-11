"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const authRouter = express_1.default.Router();
authRouter.post("/login", auth_controller_1.AuthController.login);
authRouter.post("/logout", auth_controller_1.AuthController.logout);
authRouter.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SUPER_ADMIN, user_interface_1.UserRole.ADMIN), auth_controller_1.AuthController.me);
exports.default = authRouter;
