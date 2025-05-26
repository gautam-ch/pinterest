import express from 'express';
import user from './routes/user.route.js';
import pin from './routes/pin.route.js';
import comment from './routes/comment.route.js';
import board from './routes/board.route.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnect } from './utils/dbConnect.js';
import cors from 'cors';

const app = express();

app.use(fileUpload());
app.use(cookieParser()); 
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));
app.use(express.json());
app.use('/users',user);
app.use('/pins',pin);
app.use('/comments',comment);
app.use('/boards',board);


app.listen(3000,()=>{
    dbConnect();
    console.log('server is running');
})