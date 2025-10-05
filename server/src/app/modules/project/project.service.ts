import { uploadFilesToCloudinary } from "../../utils/upload-files";
import { QueryBuilder } from "../../lib/queryBuilder";
import Project from "./project.model";
import { CreateProjectSchemaType } from "./project.validation";

const getAllProjects = async (query: Record<string, string>) => {
  const builder = new QueryBuilder(Project, query as Record<string, string>);
  const projects = await builder
    .filter()
    .search(["title", "description", "tags"])
    .paginate()
    .execWithMeta();

  return projects;
};

const createProject = async (
  projectData: CreateProjectSchemaType,
  file: Express.Multer.File
) => {
  if (file) {
    const uploadedFile = await uploadFilesToCloudinary(file, "projects");
    projectData.details.image = {
      url: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.url
        : uploadedFile?.url,
      pub_id: Array.isArray(uploadedFile)
        ? uploadedFile[0]?.pub_id
        : uploadedFile?.pub_id,
    };
  }
  const newProject = await Project.create(projectData);
  if (!newProject) throw new Error("Project not created");
  console.log(newProject);
  console.log(projectData);
  return newProject;
};

export const ProjectService = {
  getAllProjects,
  createProject,
};
