import express from 'express'
import dbConnection from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import linksRouter from './routes/links.js'
import filesRouter from './routes/files.js';
import cors from 'cors'


const app  = express();


dotenv.config();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
// connect to db
dbConnection(); 

//CORS PERMISSIONS
const corsCfg = {
    origin: process.env.FRONT_URL,
}
app.use(cors());

app.use( express.static('uploads') );
//PORT
const PORT = process.env.PORT || 11000; 

const server = app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Node-Send-React Backend Server Run On Port ${server.address().port}`);
})

server.on('error',(err)=>{
    console.log(err);
});

//Project Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/links', linksRouter);
app.use('/api/files', filesRouter);