import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import { homeRouter } from './routes/home.js';
import ActivityRouter from './routes/activity.routes.js';
import cors from "cors";
import authRouter from './routes/auth.routes.js';
import passwordrouter from './routes/requestPasswordReset.routes.js';
const app = express();
dotenv.config();
const PORT = 5000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors()) 
app.use(express.json())
app.use('/', homeRouter)
app.use('/api', ActivityRouter)
app.use('/api/auth', authRouter)
app.use('/api/otp', passwordrouter)

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(PORT, console.log("Server started at port 5000"));
}).catch( (err) => {
    console.log(err);
})
