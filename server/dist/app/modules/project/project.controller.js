"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const project_service_1 = require("./project.service");
const getAllProjects = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Projects retrieved successfully",
        data: yield project_service_1.ProjectService.getAllProjects(query),
    });
}));
const createProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectData = req.body;
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Project created successfully",
        data: yield project_service_1.ProjectService.createProject(projectData, req.file),
    });
}));
const getProjectBySlug = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Project found",
        data: yield project_service_1.ProjectService.getProjectBySlug(req.params.slug),
    });
}));
const updateProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Project updated successfully",
        data: yield project_service_1.ProjectService.updateProject(req.params.slug, req.body),
    });
}));
const deleteProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Project deleted successfully",
        data: yield project_service_1.ProjectService.deleteProject(req.params.slug),
    });
}));
exports.ProjectController = {
    getAllProjects,
    createProject,
    getProjectBySlug,
    updateProject,
    deleteProject,
};
