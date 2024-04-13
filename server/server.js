import express  from "express";
import {config}  from 'dotenv' 
import colors from 'colors'
import morgan from "morgan"
import { connectDB } from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();

config({
    path:"server/config/config.env"
});
connectDB()


app.use(express.json()) ;
app.use(morgan('dev'))

import user from './routes/userRoutes.js'
import admin from './routes/adminRoutes.js'
import doctor from './routes/doctorRoutes.js'
app.use("/api/v1",user)
app.use("/api/v1",admin)
app.use("/api/v1",doctor)

app.use(express.static(path.join(__dirname,"../client/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../client/dist/index.html"));
});



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white)
})