import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors"
import { notFound } from "./app/middlewares/notFound";
import { errorHandler } from "./app/middlewares/errorHandler";
import router from "./app/routes";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
      callback(null, origin || true); // allow whatever origin comes
    },
    credentials: true,
  }))

app.use("/api/v1",router)

app.get("/",(_req,res)=>{
    res.status(200).json({message:"server is running"})
})

app.use(notFound)
app.use(errorHandler)

export default app