import { uploadFilesToCloudinary } from "../../utils/upload-files";
import { QueryBuilder } from "../../lib/queryBuilder";
import Project from "./project.model";
import { CreateProjectSchemaType } from "./project.validation";
import AppError from "../../helpers/appError";
import slugify from "slugify";

const getAllProjects = async (query: Record<string, string>) => {
  const builder = new QueryBuilder(Project, query as Record<string, string>);
  const projects = await builder
    .filter()
    .search(["title", "description", "tags"])
    .paginate()
    .execWithMeta();

  return { projects: projects.data, meta: projects.meta };
};

const createProject = async (
  projectData: CreateProjectSchemaType,
  file: Express.Multer.File
) => {
  const payload = {
    ...projectData,
    details: {
      ...projectData.details,
      techStack: [""],
      features: [""],
    },
    slug: "",
  };
  if (file) {
    const uploadedFile = await uploadFilesToCloudinary(file, "projects");
    if (!uploadedFile) throw new AppError(500, "File upload failed");

    payload.details.image = {
      url: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.url
        : uploadedFile?.url,
      pub_id: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.pub_id
        : uploadedFile?.pub_id,
    };
  }

  payload.details.techStack = projectData.details.techStack
    .split(",")
    .map((tech) => tech.trim());

  payload.details.features = projectData.details.features
    .split(",")
    .map((feature) => feature.trim());

  payload.slug = slugify(projectData.title, {
    lower: true,
  });
  const newProject = await Project.create(payload);
  if (!newProject) throw new AppError(500, "Project not created");

  return newProject;
};

const getProjectBySlug = async (slug: string) => {
  const project = await Project.findOne({ slug });
  if (!project) throw new AppError(404, "No Project Found");

  return project;
};

const updateProject = async (
  slug: string,
  projectData: Partial<CreateProjectSchemaType>
) => {
  const existingProject = await Project.findOne({ slug });
  if (!existingProject) throw new AppError(404, "No Project Found");

  const updatedData = {
    ...existingProject.toObject(),
    ...projectData,
    details: {
      ...existingProject.details,
      ...projectData.details,
      image: projectData.details?.image || existingProject.details?.image,
    },
  };

  const updatedProject = await Project.findOneAndUpdate({ slug }, updatedData, {
    new: true,
  });

  return updatedProject;
};

const deleteProject = async (slug: string) => {
  const project = await Project.findOneAndDelete({ slug });
  if (!project) throw new AppError(404, "No Project Found");

  return project;
};

export const ProjectService = {
  getAllProjects,
  createProject,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
