import express,{ Router } from 'express';
import { newLink, getLink, getAll, checkPassword} from '../controllers/linksController.js';
const linksRouter = Router();
import { check } from 'express-validator'
import { auth } from '../middlewares/getAuth.js';


const validate = [ 
    check('name', 'upload a valid file').not().isEmpty(),
    check('original_name', 'upload a valid file').not().isEmpty()
];



linksRouter.get('/', getAll);
linksRouter.post('/', validate, auth, newLink);
linksRouter.get('/:url', getLink);
linksRouter.post('/:url', checkPassword, getLink);

export default linksRouter;