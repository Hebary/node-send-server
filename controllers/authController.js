import User from "../models/User.js"
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator'
import jwt from "jsonwebtoken";


export const userAuth = async (req, res, next) => {
    //check for errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //is user registered
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(401).json({msg: 'User not found'});
        return next();
    }
    //confirm password 

    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
        res.status(401).json({msg: 'Invalid credentials'});
        return next();
    }
    //if everything is ok, send token
    
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
   return res.status(200).json({token});
}


export const userIsAuth = async (req, res, next) => {
   return res.json({user : req.user})
}
