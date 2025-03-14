import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModal from "../models/user.modal.js";
dotenv.config();

// const EMAIL = process.env.EMAIL;
// const PASSWORD = process.env.PASSWORD;


const login = async (req, res) => {

    const {email, password} = req.body;

    const user = await UserModal.findOne({ email });

    if(!user){
        return res.status(400).json({ msg: 'User Not found'})
    }
    //  console.log(user.email, "---", email, "---", password );
     
    if (email === user.email && password === user.password){

        const token = jwt.sign({email}, process.env.TOKEN_KEY, {expiresIn: "1h"});

        return res.status(200).json({
            statusCode: 200,
            msg: "Login Successful",
            token,
        });
    }

    return res.status(401).json({
        statusCode: 401,
        msg: "Invalid Credentials",
    })
}

const signup = async (req, res) => {
    const {email, password} = req.body; 
    const user = new UserModal(req.body);

    try{
        const newUser = await user.save();

        const token = jwt.sign({email}, process.env.TOKEN_KEY, {expiresIn: "1h"})

        return res.status(201).json({
            statusCode: 200,
            msg: "Added User successfully",
            newUser,
            token
        }); 

    }catch (err){
        res.status(400).json({message: err.message})
    }
}

export {login, signup}
