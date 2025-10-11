"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProjectImage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.uploadProjectImage = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
