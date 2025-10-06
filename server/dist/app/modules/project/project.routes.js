"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const project_validation_1 = require("./project.validation");
const uploadFile_1 = require("../../middlewares/uploadFile");
const checkAuth_1 = require("../../middlewares/checkAuth");
const projectRouter = express_1.default.Router();
projectRouter
    .route("/")
    .get(project_controller_1.ProjectController.getAllProjects)
    .post(uploadFile_1.uploadProjectImage.single("image"), (0, validateRequest_1.validateRequest)(project_validation_1.createProjectSchema), (0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), project_controller_1.ProjectController.createProject);
projectRouter
    .route("/:slug")
    .get(project_controller_1.ProjectController.getProjectBySlug)
    .put((0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), project_controller_1.ProjectController.updateProject)
    .delete((0, checkAuth_1.checkAuth)("ADMIN", "SUPER_ADMIN"), project_controller_1.ProjectController.deleteProject);
exports.default = projectRouter;
