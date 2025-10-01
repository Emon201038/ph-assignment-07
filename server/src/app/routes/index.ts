import express from "express";
import userRouter from "../modules/user/user.routes";
import projectRouter from "../modules/project/project.routes";
import blogRouter from "../modules/blog/blog.routes";
import authRouter from "../modules/auth/auth.routes";

const router = express.Router()
const routes = [
    {
        path:"/user",
        route: userRouter
    },
    {
        path:"/project",
        route: projectRouter
    },
    {
        path:"/blog",
        route: blogRouter
    },
    {
        path:"/auth",
        route: authRouter
    },
];
routes.forEach(r=>{
    router.use(r.path,r.route)
});

export default router