"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, { statusCode = 200, success = true, message = "Success", data }) => {
    res.status(statusCode).json({ statusCode, success, message, data });
};
exports.sendResponse = sendResponse;
