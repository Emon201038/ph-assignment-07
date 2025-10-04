import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/apiError";
import User from "../user/user.model";
import { envVars } from "../../config/env";

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).lean();
  if (!user) {
    throw new ApiError(404, "No user found");
  }

  const isPassMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPassMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    envVars.JWT_SECRET
  );

  const { password, ...userInfo } = user;
  return { token, ...userInfo };
};

export const AuthService = { login };
