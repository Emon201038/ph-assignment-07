import express from "express"
import { notFound } from "./app/middlewares/notFound";
import { errorHandler } from "./app/middlewares/errorHandler";
import router from "./app/routes";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",router)

app.get("/",(_req,res)=>{
    res.status(200).json({message:"server is running"})
})

app.use(notFound)
app.use(errorHandler)

export default app