import express from 'express';
import {requestPasswordReset, verifyOTP, resetPassword} from "../controller/password.controller.js";

const router = express.Router();

router.post('/requestPasswordReset', requestPasswordReset);
router.post('/verifyOTP', verifyOTP);
router.post('/resetPassword', resetPassword);

export default router;