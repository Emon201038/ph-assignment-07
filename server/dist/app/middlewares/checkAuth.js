"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const apiError_1 = __importDefault(require("../utils/apiError"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const checkAuth = (...roles) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.token || req.headers.authorization;
    if (!accessToken) {
        throw new apiError_1.default(403, "You are not logged in.");
    }
    const decoded = (0, jwt_1.verifyJwt)(accessToken, env_1.envVars.JWT_SECRET);
    if (!decoded) {
        throw new apiError_1.default(403, "You are not logged in.");
    }
    if (!roles.includes(decoded.role)) {
        throw new apiError_1.default(403, "You are not authorized to access this route.");
    }
    req.user = decoded;
    next();
}));
exports.checkAuth = checkAuth;
