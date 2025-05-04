import express from 'express';
import {getUser} from '../controllers/user.controller.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';


const router = express.Router();

router.get('/:username',getUser);

router.post('/create',async(req,res)=>{
          
       const  userInfo = req.body;

       console.log(userInfo);
       
       const hashPassword = await bcrypt.hash(userInfo.password,10);

       await User.create({
          displayName:userInfo.name,
          username:userInfo.username,
          email:userInfo.email,
          hashPassword:hashPassword,
          
       })

       res.json('user created');
            
})

export default router;