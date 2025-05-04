import express from 'express';
import user from './routes/user.route.js';
import pin from './routes/pin.route.js';
import comment from './routes/comment.route.js';
import board from './routes/board.route.js';
import { dbConnect } from './utils/dbConnect.js';
import cors from 'cors';

const app = express();

app.use(cors({origin:process.env.CLIENT_URL}));
app.use(express.json());
app.use('/users',user);
app.use('/pins',pin);
app.use('/comments',comment);
app.use('/boards',board);


app.listen(3000,()=>{
    dbConnect();
    console.log('server is running');
})