import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import User from "../user/user.model";

const login = catchAsync(async (req, res, _next) => {
  const response = await AuthService.login({
    email: req.body.email,
    password: req.body.password,
  });
  if (response.token) {
    res.cookie("token", response.token, {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    message: "Logged in successfull",
    data: response,
  });
});

const logout = catchAsync(async (req, res, _next) => {
  res.clearCookie("token");
  sendResponse(res, {
    statusCode: 200,
    message: "Logged out successfull",
  });
});

const me = catchAsync(async (req, res, _next) => {
  const header = req.headers.authorization;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: await User.findById((req as any).user.id).select("-password"),
  });
});
export const AuthController = { login, logout, me };
