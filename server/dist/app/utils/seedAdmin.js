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
exports.seedAdmin = void 0;
const env_1 = require("../config/env");
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const apiError_1 = __importDefault(require("./apiError"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExists = yield user_model_1.default.findOne({ email: env_1.envVars.SUPER_ADMIN_EMAIL });
        if (isExists) {
            console.log('Super admin is already exists');
        }
        else {
            yield user_model_1.default.create({
                name: env_1.envVars.SUPER_ADMIN_NAME,
                email: env_1.envVars.SUPER_ADMIN_EMAIL,
                password: env_1.envVars.SUPER_ADMIN_PASSWORD,
                role: user_interface_1.UserRole.SUPER_ADMIN
            });
            console.log('Super admin created successfully');
        }
    }
    catch (error) {
        throw new apiError_1.default(500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.seedAdmin = seedAdmin;
