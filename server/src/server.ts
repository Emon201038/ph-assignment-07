/* eslint-disable no-console */
import { Server } from "http";
import { connectDB } from "./app/config/db";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

const start = async () => {
  try {
    await connectDB();
    await seedAdmin();

    // ✅ Only start a real HTTP server in local/development
    if (!process.env.VERCEL) {
      const port = envVars.PORT || 5000;
      server = app.listen(port, () => {
        console.log(`🚀 Server running locally on port ${port}`);
      });
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();

// ✅ Export for Vercel (serverless)
export default app;

// 🧹 Graceful shutdown (optional but recommended)
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  if (server) server.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  if (server) server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  if (server) server.close();
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Exiting...");
  if (server) server.close();
});
