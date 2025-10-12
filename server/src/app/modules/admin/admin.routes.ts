import express from "express";
import { AdminController } from "./admin.controller";
const adminRouter = express.Router();

adminRouter.get("/stats", AdminController.getStats);

export default adminRouter;
