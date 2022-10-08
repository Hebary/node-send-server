import Links from '../models/Links.js'
import shortid from 'shortid'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

//using middleware auth to check if user is logged in
export const newLink = async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { original_name, name } = req.body
    //create link object
    const link = new Links()
    link.original_name = original_name;
    link.name = name;
    link.url = shortid.generate();

    //check if user is logged in
    if(req.user) {
        const { password, downloads } = req.body;
        if(downloads){
            link.downloads = downloads;
        }
        if(password){
            const salt = await bcrypt.genSalt(10)
            link.password = await bcrypt.hash(password, salt)
        }
        //Asign autor
        link.autor = req.user.id
    }
    
    //hash password
    try {
        await link.save()
        res.status(201).json({ msg: `${link.url} ` })
        next()
    } catch (error) {
        res.status(500).json({ msg: 'Error creating link' });
    }
}


//check if password is correct
export const checkPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password } = req.body;

    const link = await Links.findOne({ url })

    if(bcrypt.compareSync(password, link.password)){
        next();
    }else{
        return res.status(401).json({ msg: 'Password is incorrect' })
    }
}



//get link by url
export const getLink = async (req, res, next) => {
    const { url } = req.params
    const link = await Links.findOne({ url })
    if(!link){
        res.status(404).json({ msg: 'Link not found' })
        return next() 
    }
    res.status(200).json({link: link})
    
    next();
}




export const getAll = async (req,res) => {
    try {
       const links = await Links.find().select('url -_id');
       
       return res.json( {links} );
    } catch (error) {
        console.log(error)
    }
}

// export const hasPassword = async (req, res, next) => {
//     const link = await Links.findOne({ url: req.params.url })
//     if(!link){
//         res.status(404).json({ msg: 'Link not found' })
//         return next() 
//     }
//     if(link.password){
//         console.log({ password: true, link: link.url })
//         return res.json({ password: true, link: link.url });
//     }
//     next();
// }