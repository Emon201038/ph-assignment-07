import express from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema } from "./project.validation";
import { uploadProjectImage } from "../../middlewares/uploadFile";

const projectRouter = express.Router();

projectRouter
  .route("/")
  .get(ProjectController.getAllProjects)
  .post(
    uploadProjectImage.single("image"),
    validateRequest(createProjectSchema),
    ProjectController.createProject
  );

export default projectRouter;
