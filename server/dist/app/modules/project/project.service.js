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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const upload_files_1 = require("../../utils/upload-files");
const queryBuilder_1 = require("../../lib/queryBuilder");
const project_model_1 = __importDefault(require("./project.model"));
const appError_1 = __importDefault(require("../../helpers/appError"));
const slugify_1 = __importDefault(require("slugify"));
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new queryBuilder_1.QueryBuilder(project_model_1.default, query);
    const projects = yield builder
        .filter()
        .search(["title", "description", "tags"])
        .paginate()
        .execWithMeta();
    return { projects: projects.data, meta: projects.meta };
});
const createProject = (projectData, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const payload = Object.assign(Object.assign({}, projectData), { details: Object.assign(Object.assign({}, projectData.details), { techStack: [""], features: [""] }), slug: "" });
    if (file) {
        const uploadedFile = yield (0, upload_files_1.uploadFilesToCloudinary)(file, "projects");
        if (!uploadedFile)
            throw new appError_1.default(500, "File upload failed");
        payload.details.image = {
            url: Array.isArray(uploadedFile)
                ? (_a = uploadedFile[0]) === null || _a === void 0 ? void 0 : _a.url
                : uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.url,
            pub_id: Array.isArray(uploadedFile)
                ? (_b = uploadedFile[0]) === null || _b === void 0 ? void 0 : _b.pub_id
                : uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.pub_id,
        };
    }
    payload.details.techStack = projectData.details.techStack
        .split(",")
        .map((tech) => tech.trim());
    payload.details.features = projectData.details.features
        .split(",")
        .map((feature) => feature.trim());
    payload.slug = (0, slugify_1.default)(projectData.title);
    const newProject = yield project_model_1.default.create(payload);
    if (!newProject)
        throw new appError_1.default(500, "Project not created");
    return newProject;
});
const getProjectBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findOne({ slug });
    if (!project)
        throw new appError_1.default(404, "No Project Found");
    return project;
});
const updateProject = (slug, projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findOneAndUpdate({ slug }, projectData, {
        new: true,
    });
    if (!project)
        throw new appError_1.default(404, "No Project Found");
    return project;
});
const deleteProject = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findOneAndDelete({ slug });
    if (!project)
        throw new appError_1.default(404, "No Project Found");
    return project;
});
exports.ProjectService = {
    getAllProjects,
    createProject,
    getProjectBySlug,
    updateProject,
    deleteProject,
};
