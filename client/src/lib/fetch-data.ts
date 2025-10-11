import { IApiResponse, IMeta, IProject } from "@/types";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (
  query?: Record<string, string>,
  init?: RequestInit
): Promise<IApiResponse<{ projects: IProject[]; meta: IMeta }>> => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${serverUrl}/api/v1/project?${queryString}`,
      init
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getProjectBySlug = async (
  slug: string,
  reqInit?: RequestInit
): Promise<IApiResponse<IProject>> => {
  try {
    const res = await fetch(`${serverUrl}/api/v1/project/${slug}`, reqInit);
    return await res.json();
  } catch (error) {
    throw error;
  }
};
