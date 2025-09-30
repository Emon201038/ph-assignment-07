export const projectsData = [
  {
    id: 1,
    title: "Sports Scoreboard Management",
    description:
      "A dynamic match scoreboard application built with NextJS, Express, GraphQL, Mongodb, SocketIO. Features real-time score tracking and management and players stats management.",
    image: "/images/mycric.png",
    tags: ["NextJS", "Redux", "Tailwind CSS", "Express", "MongoDB", "SocketIO"],
    github: [],
    live: "https://mycric.app",
    featured: true,
    details: {
      techStack: [
        "NextJS",
        "Express",
        "GraphQL",
        "MongoDB",
        "SocketIO",
        "Redux",
        "Tailwind CSS",
      ],
      features: [
        "Real-time score tracking",
        "Player stats management",
        "Admin dashboard",
        "Responsive UI",
      ],
      role: "Full Stack Developer",
      duration: "Jan 2024 - Mar 2024",
    },
  },
  {
    id: 2,
    title: "Parcel Delivery Management System",
    description:
      "A full-stack delivery management system built with MERN stack. Features include user authentication, order management, and real-time tracking. This project showcases modern web development practices.",
    image: "/images/project-1.png",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    github: [
      {
        name: "Frontend",
        url: "https://github.com/Emon201038/parcel-delivery-system/tree/main/client",
      },
      {
        name: "Backend",
        url: "https://github.com/Emon201038/parcel-delivery-system/tree/main/server",
      },
    ],
    live: "https://parcel-delivery-system-tau.vercel.app",
    featured: true,
    details: {
      techStack: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
      features: [
        "User authentication",
        "Parcel Tracking",
        "Send Parcel",
        "Update Parcel Status",
        "Admin dashboard",
      ],
      role: "Lead Developer",
      duration: "June 2025 - Aug 2025",
    },
  },
  {
    id: 3,
    title: "Book Store Application",
    description:
      "A comprehensive book store management system with both client and server components. Built with modern JavaScript frameworks and includes features for browsing, purchasing, and managing books.",
    image: "/images/library.png",
    tags: ["JavaScript", "React", "Node.js", "Express"],
    github: [
      {
        name: "Frontend",
        url: "https://github.com/Emon201038/library-management",
      },
    ],
    live: "https://library-management-two-livid.vercel.app",
    featured: true,
    details: {
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      features: [
        "Book browsing",
        "Purchase management",
        "Inventory control",
        "User reviews",
      ],
      role: "Frontend Developer",
      duration: "Mar 2024 - May 2024",
    },
  },
];
