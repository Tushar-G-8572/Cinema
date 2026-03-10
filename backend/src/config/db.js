import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

export async function connectToDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To DB");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}