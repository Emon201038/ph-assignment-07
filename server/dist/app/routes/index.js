"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const project_routes_1 = __importDefault(require("../modules/project/project.routes"));
const blog_routes_1 = __importDefault(require("../modules/blog/blog.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/user",
        route: user_routes_1.default
    },
    {
        path: "/project",
        route: project_routes_1.default
    },
    {
        path: "/blog",
        route: blog_routes_1.default
    },
    {
        path: "/auth",
        route: auth_routes_1.default
    },
];
routes.forEach(r => {
    router.use(r.path, r.route);
});
exports.default = router;
