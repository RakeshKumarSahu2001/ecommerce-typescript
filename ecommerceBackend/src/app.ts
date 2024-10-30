import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_URL,
    credentials: true,
}))


app.use(express.json({
    limit: "15kb",
}))
app.use(express.urlencoded({
    limit: "15kb",
    extended: true
}))
app.use(cookieParser())



// routes
import userRouter from "./routes/user.routes";
import ApiErrorHandler from "./utils/ApiErrorHandler";
app.use("/api/v1/users", userRouter)

// adminroutes
import adminRouter from "./routes/admin.routes"
app.use("/api/v1/admin", adminRouter)




//Handle API error
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiErrorHandler) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
        })
    }
    return res.status(500).json({
        success: false,
        message: "something went wrong on the server page",
        err: err
    })
})

export default app;