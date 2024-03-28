//require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({path: './.env'})


// async function returns promises they can be handled by .then and .catch 
connectDB()
.then(() => {
    app.on("error", (error)=>{
        console.log("error ", error);
        throw error;
    });
    
    app.listen(process.env.PORT || 4000, () =>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed!!", err)
})






/*
// This is first approch to connect to db
import express from "express"
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error: ", error);
            throw error;
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error: ", error);
    }
})()
*/