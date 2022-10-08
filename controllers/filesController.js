import shortid from 'shortid';
import multer from 'multer'
import fs from 'fs'
import Links from '../models/Links.js';


export const newFile = async (req, res, next) => {

    const multerConfig = {
        limits: {
            fileSize: req.user ? (1024 * 1024 * 10) : (1024 * 1024 * 3)
        },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
            filename: (req, file, cb) => {
                // const extension = file.mimetype.split('/')[1]; //erros on pdf files mimetype
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }

    const upload = multer(multerConfig).single('file');

    upload(req, res, async (error) => {
        if (!error) {
            res.status(200).json({
                file: req.file.filename
            })
            
        } else {
            console.log(error)
            return next()
        }
    });
}

export const deleteFile = async (req, res, next) => {
    try {
        fs.unlinkSync(`uploads/${req.file}`)
    } catch (error) {
        console.log(error)
    }
}

export const downloadFile = async (req, res, next) => {
    
    const link = await Links.findOne({ name: req.params.file })
    if(!link){
        res.status(404).json({ msg: 'Link not found' })
        return next() 
    }

	const file ='uploads/'+ req.params.file;
    res.download(file);

    //delete file/ entry DB after download
    const { downloads, name, _id } = link;

    if(downloads === 1){
        req.file = name;
        await Links.findOneAndDelete({ _id });
        next();

    } else{
        link.downloads--;
        await link.save()
    }
}