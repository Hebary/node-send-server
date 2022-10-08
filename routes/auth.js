import express,{ Router } from 'express';
import { userAuth, userIsAuth } from '../controllers/authController.js';
const authRouter = Router();
import { check } from 'express-validator'
import { auth } from '../middlewares/getAuth.js';

authRouter.post('/',
[
    check('email','please enter valid email').isEmail(),
    check('password', 'password must not be empty').not().isEmpty(),
], userAuth);

authRouter.get('/', auth, userIsAuth);

export default authRouter;