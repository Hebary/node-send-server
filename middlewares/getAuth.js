import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();
   

export const auth = ( req, res, next ) => {
    if(
        req.headers?.authorization  && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            const token =  req.headers.authorization.split(" ")[1];
            if(!token) {
                res.status(403).json({msg: 'You are not authorized'});
                return next();
            }
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            return next();
        } catch (err) {
            return res.status(401).json({ msg: err.message });
        }
    }
    else if(!req.headers.authorization){
        return next();
    }
    next();
}