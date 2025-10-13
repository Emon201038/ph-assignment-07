import About from "@/components/About";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import React from "react";

const LandingLayout = ({
  projects,
  blogs,
}: {
  children: React.ReactNode;
  projects: React.ReactNode;
  blogs: React.ReactNode;
}) => {
  return (
    <>
      <Hero />
      <About />
      {projects}
      <Skills />
      {/* <Blogs /> */}
      {blogs}
      <Contact />
      <Footer />
    </>
  );
};

export default LandingLayout;
