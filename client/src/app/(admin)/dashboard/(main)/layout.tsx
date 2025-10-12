import React from "react";

const DashboardLayout = ({
  children,
  analytics,
  recentProjects,
  recentBlogs,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  recentProjects: React.ReactNode;
  recentBlogs: React.ReactNode;
}) => {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {children}
      <div className="space-y-8">
        {analytics}

        <div className="grid gap-8">
          <div className="space-y-8">
            {recentProjects}
            {recentBlogs}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
