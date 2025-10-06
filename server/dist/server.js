"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Server } from "http";
const db_1 = require("./app/config/db");
const app_1 = __importDefault(require("./app"));
// import { envVars } from "./app/config/env";
const seedAdmin_1 = require("./app/utils/seedAdmin");
// let server: Server;
(0, db_1.connectDB)().then(() => (0, seedAdmin_1.seedAdmin)());
exports.default = app_1.default;
// const startServer = async () => {
//   try {
//     await connectDB();
//     await seedAdmin();
//     app.listen(envVars.PORT, () => {
//       console.log(`Server is running on port ${envVars.PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// (async () => {
//   await startServer();
// })();
// process.on("unhandledRejection", (error) => {
//   if (server) {
//     server.close(() => {
//       console.error(error);
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// });
// process.on("uncaughtException", (error) => {
//   if (server) {
//     server.close(() => {
//       console.error(error);
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// });
// process.on("SIGTERM", () => {
//   console.log("SIGTERM received");
//   if (server) {
//     server.close();
//   }
// });
// process.on("SIGINT", () => {
//   console.log("SIGINT received");
//   if (server) {
//     server.close();
//   }
// });
// export default app;
