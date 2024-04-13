import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Mongodb Server Issue ${error}`.bgRed.white) 
    }

}