import { IProject } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const ProjectCard = ({
  project,
  index,
  inView,
}: {
  project: IProject;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
      project.featured ? "md:col-span-2" : ""
    }`}
  >
    {/* Project Image */}
    <div className="relative overflow-hidden">
      <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
        {/* <div className="text-white text-xl font-semibold">Project Image</div> */}
        <Image
          objectFit="contain"
          fill
          alt="project_image"
          src={project.image}
          className="bg-transparent"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
          {project.github.map((stack) => (
            <motion.div
              key={stack.name}
              onClick={() => window.open(stack.url, "_blank")}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <Github size={20} />
              <p> {stack.name}</p>
            </motion.div>
          ))}
          {project.live !== "#" && (
            <motion.div
              onClick={() => window.open(project.live, "_blank")}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
            >
              <ExternalLink size={20} />
            </motion.div>
          )}
        </div>
      </div>
    </div>

    {/* Project Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
