export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: {
    name: string;
    url: string;
  }[];
  live: string;
  featured: boolean;
  details: {
    techStack: string[];
    features: string[];
    role: string;
    duration: string;
  };
}
