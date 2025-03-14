import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const verifyToken = (req, res , next) => {
    const token = String(req.headers.authorization).replace(/^bearer|^jwt/i, "").replace(/^\s+|\s+$/gi, "");


    try{
        if(!token){
            return res.status(403).json({ statusCode: 403, msg: "A token is required for authentication"})
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userData = decoded;
    }catch(err){
        return res.status(401).json({
            statusCode: 401,
            msg: "Invalid Token"
        });
    }
    return next();
}

export default verifyToken;