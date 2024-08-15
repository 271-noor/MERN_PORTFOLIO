import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js'
import messageRouter from './routers/messageRoute.js'
import userRouter from './routers/userRouter.js'

const app = express()
dotenv.config({path: "./config/config.env"})

// middleware frontend & backend ko connect krne k liye
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})
);


// router
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);


// database connection
dbConnection(),
app.use(errorMiddleware);

export default app;