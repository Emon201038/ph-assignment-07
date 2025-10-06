import { IApiResponse, IMeta, IProject } from "@/types";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (
  query?: Record<string, string>,
  init?: RequestInit
): Promise<IApiResponse<{ projects: IProject[]; meta: IMeta }>> => {
  const queryString = new URLSearchParams(query).toString();
  const response = await fetch(
    `${serverUrl}/api/v1/project?${queryString}`,
    init
  );
  return response.json();
};
