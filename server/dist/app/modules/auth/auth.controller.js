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
exports.AuthController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../utils/catchAsync");
const user_model_1 = __importDefault(require("../user/user.model"));
const login = (0, catchAsync_1.catchAsync)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield auth_service_1.AuthService.login({
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
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Logged in successfull",
        data: response,
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Logged out successfull",
    });
}));
const me = (0, catchAsync_1.catchAsync)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    console.log("headers", header);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        data: yield user_model_1.default.findById(req.user.id).select("-password"),
    });
}));
exports.AuthController = { login, logout, me };
