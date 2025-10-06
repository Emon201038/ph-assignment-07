import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { CreateProjectSchemaType } from "./project.validation";

const getAllProjects = catchAsync(async (req, res) => {
  const query = req.query;

  sendResponse(res, {
    statusCode: 200,
    message: "Projects retrieved successfully",
    data: await ProjectService.getAllProjects(query as Record<string, string>),
  });
});

const createProject = catchAsync(async (req, res) => {
  const projectData = req.body as CreateProjectSchemaType;
  sendResponse(res, {
    statusCode: 201,
    message: "Project created successfully",
    data: await ProjectService.createProject(
      projectData,
      req.file as Express.Multer.File
    ),
  });
});

const getProjectBySlug = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Project found",
    data: await ProjectService.getProjectBySlug(req.params.slug),
  });
});

const updateProject = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Project updated successfully",
    data: await ProjectService.updateProject(req.params.slug, req.body),
  });
});

const deleteProject = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Project deleted successfully",
    data: await ProjectService.deleteProject(req.params.slug),
  });
});

export const ProjectController = {
  getAllProjects,
  createProject,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
