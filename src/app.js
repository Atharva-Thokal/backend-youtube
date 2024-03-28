import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//below 4 config are very imp read about it
// after reading remove this line and write readed 
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRoute from "./routes/user.route.js"

app.use("/api/v1/users", userRoute)

export { app }