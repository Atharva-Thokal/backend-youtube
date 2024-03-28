import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async() => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`\nMongoDB connected! Host: ${connectionInstance.connection.host}`);//gives url where mongodb is there


    } catch (error) {
        console.log("MONGOOSE connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;