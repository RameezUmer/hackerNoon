import UserModal from "../models/user.modal.js";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Activity from "../models/activity.model.js"


dotenv.config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS 
  }
});

const sendOTP = async (email, otp) => {

  
  const mailOptions = {
    from: process.env.REAL_EMAIL,  // Replace with the sender's email
    to: email,
    subject: 'PAssword Reset OTP',
    text: `Your OTP for resetting your password is ${otp}. It is valid for 10 minutes.`,
  };

  const response = await transport.sendMail(mailOptions);
  console.log(response);
  
    // console.log("apple", process.env.REAL_EMAIL);
    // console.log("apple pie", process.env.REAL_PASSWORD);
    
    // const transporter  = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.REAL_EMAIL,
    //         pass: REAL_PASSWORD,
    //     }
    // });
    
    // try{

    //   const msg = {
    //     to: email,  // The recipient's email address
    //     from: process.env.REAL_EMAIL,  // The verified sender email (use a verified SendGrid email or domain)
    //     subject: 'Password Reset OTP',
    //     text: `Your OTP for resetting your password is ${otp}. It is valid for 10 minutes.`,
    //   };
      
    //   const response = await sgMail.send(msg);
    //   console.log("OTP sent seccussfully sentOTP function",response);
    // } catch(err){
    //   console.error("Error sending OTP via SendGrid:", err);
    // }
  

    // const mailOptions = {
    //     from: process.env.REAL_EMAIL,
    //     to: email,
    //     subject: 'Password Reset OTP',
    //     text: `Your OTP for resetting your password is ${otp}. It is valid for 10 minutes.`
    // }
    // console.log(mailOptions);
    

    // await transporter.sendMail(mailOptions);
}


const requestPasswordReset = async (req, res, next) => {
    const {email} = req.body;
    const user = await UserModal.findOne({ email });
    if(!user){
        return res.status(400).json({ msg: 'User not found'});
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    
    user.passwordResetOtp = otp;
    user.passwordResetExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    console.log(otp,email, "otp herered");
    

    try{
        await sendOTP(email, otp);
        return res.status(200).json({ msg: "OTP sent to email"})
    }catch(err){
        return res.status(500).json({ msg: "Error sending email", err})
    }
}

const verifyOTP =async (req, res) => {
    const {email, otp} = req.body;
    console.log(email);
    

     // Check if the user exists
  const user = await UserModal.findOne({ email });
  console.log(user);
  
  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  if (user.passwordResetOtp !== otp || Date.now() > user.passwordResetExpiry) {
    return res.status(400).json({ msg: 'Invalid or expired OTP' });
  }

  const resetToken = jwt.sign(
    { email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: '1h' }  // Token valid for 1 hour
  );

  return res.status(200).json({ msg: `OTP verified`, resetToken})

}

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    // console.log(token, "//////////");
    
    // Verify the reset token
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await UserModal.findOne({ email: decoded.email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Set the new password
      user.password = newPassword; // You should hash the password before saving
      user.passwordResetOtp = undefined;
      user.passwordResetExpiry = undefined;
      await user.save();
  
      return res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
}


export {requestPasswordReset, verifyOTP, resetPassword};