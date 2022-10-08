import User from "../models/User.js";
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'


export const newUser = async (req, res) => {

    const { email, password } = req.body
    
    let user = await User.findOne({ email })
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if ( user ) {
        const error = new Error(`User ${email} already exists`);
        return res.status(404).json({ msg: error.message });
    }

    try {
        user = new User(req.body);
        //hash password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save();

        return res.json({ msg: "User Account Created Succesfully!"});

    } catch (err) {
        console.log(err);
    }
}