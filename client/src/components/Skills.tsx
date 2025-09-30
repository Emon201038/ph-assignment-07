"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Vue.js", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 90 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 85 },
        { name: "GraphQL", level: 75 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Figma", level: 85 },
        { name: "Jest/Testing", level: 80 },
        { name: "CI/CD", level: 75 },
      ],
    },
  ];

  const SkillBar = ({
    skill,
    index,
    categoryIndex,
  }: {
    skill: { name: string; level: number };
    index: number;
    categoryIndex: number;
  }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
      if (inView) {
        const timer = setTimeout(() => {
          setAnimatedLevel(skill.level);
        }, (categoryIndex * 3 + index) * 100);
        return () => clearTimeout(timer);
      }
    }, [inView, skill.level, index, categoryIndex]);

    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: (categoryIndex * 3 + index) * 0.1 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {skill.name}
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            {animatedLevel}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${animatedLevel}%` : 0 }}
            transition={{
              duration: 1.5,
              delay: (categoryIndex * 3 + index) * 0.1,
            }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {category.title}
              </h3>
              <div>
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React Native",
              "Redux",
              "Prisma",
              "Supabase",
              "Vercel",
              "Netlify",
              "Stripe",
              "Socket.io",
              "Three.js",
              "Framer Motion",
              "Material-UI",
              "Chakra UI",
              "Sass",
              "Webpack",
              "Vite",
              "Firebase",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.05,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full font-medium cursor-default shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Currently Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I believe in continuous learning and staying updated with the latest
            technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "Django", "C++", "Machine Learning"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full font-medium border-2 border-yellow-200 dark:border-yellow-700"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
