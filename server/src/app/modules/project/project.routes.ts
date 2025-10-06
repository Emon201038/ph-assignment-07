import express from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema } from "./project.validation";
import { uploadProjectImage } from "../../middlewares/uploadFile";
import { checkAuth } from "../../middlewares/checkAuth";

const projectRouter = express.Router();

projectRouter
  .route("/")
  .get(ProjectController.getAllProjects)
  .post(
    uploadProjectImage.single("image"),
    validateRequest(createProjectSchema),
    checkAuth("ADMIN", "SUPER_ADMIN"),
    ProjectController.createProject
  );

projectRouter
  .route("/:slug")
  .get(ProjectController.getProjectBySlug)
  .put(checkAuth("ADMIN", "SUPER_ADMIN"), ProjectController.updateProject)
  .delete(checkAuth("ADMIN", "SUPER_ADMIN"), ProjectController.deleteProject);

export default projectRouter;
