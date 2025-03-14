import express from "express";

import { getActivities } from "../controller/activity.controller.js";
import { addActivity } from "../controller/activity.controller.js";
import auth from "../middleware/auth.js"
import {deleteActivity, editActivtiy} from "../controller/activity.controller.js"
const ActivityRouter = express.Router();

ActivityRouter.get('/activities', auth,  getActivities);
ActivityRouter.post('/AddActivity', auth, addActivity);
ActivityRouter.delete('/deleteActivtiy/:id', deleteActivity);
ActivityRouter.put('/editActivtiy/:id', editActivtiy);

export default ActivityRouter;