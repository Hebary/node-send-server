import express,{ Router } from 'express';
import { newUser } from '../controllers/userController.js';
const userRouter = Router();
import { check } from 'express-validator'

const validation = [
    check('name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
]

userRouter.post('/', validation, newUser);

export default userRouter;