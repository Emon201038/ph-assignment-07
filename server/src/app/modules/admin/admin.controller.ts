import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getStats = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await AdminService.getStats();

    return sendResponse(res, {
      statusCode: 200,
      message: "Stats retrieved successfully",
      data: stats,
    });
  }
);

export const AdminController = {
  getStats,
};
