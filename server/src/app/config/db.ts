/* eslint-disable no-console */
import mongoose from "mongoose";
import { envVars } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("DB connected with this URI:", envVars.DB_URL);
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
  }
};