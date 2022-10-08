import express, { Router } from 'express';
import { newFile, deleteFile, downloadFile } from '../controllers/filesController.js';
const filesRouter = Router();
import { auth } from '../middlewares/getAuth.js';

//upload files


filesRouter.post('/', auth, newFile);

filesRouter.get('/:file', downloadFile, deleteFile);


export default filesRouter;