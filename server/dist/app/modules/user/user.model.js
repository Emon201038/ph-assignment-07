"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        min: [2, "Name should minimum 2 charecters"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "email is required"],
        min: [2, "email should minimum 2 charecters"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required"],
        min: [6, "password should minimum 6 charecters"],
        set: function (v) {
            return bcryptjs_1.default.hashSync(v, 12);
        }
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.UserRole),
        default: user_interface_1.UserRole.USER
    }
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
