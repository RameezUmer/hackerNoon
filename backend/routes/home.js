import express from "express"
import { homePage } from "../controller/home.js";


export const homeRouter = express.Router();

homeRouter.get('/', homePage)