import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUser =async(req,res)=>{
       const {username} = req.params;
         
       const user = await User.findOne({username});

       const {hashPassword,...data} = user.toObject();

       res.status(200).json(data);

}

export const registerUser = async(req,res)=>{   
              const  {username,name,password,email} = req.body;
               
              if(!email || !password || !username){
                     return res.status(400).json({message:'All fields are required!'});
              }

              const pwd = await bcrypt.hash(password,10);
       
              const data = await User.create({
                 displayName:name,
                 username,
                 email,
                 hashPassword:pwd
              })
            
              const token = jwt.sign({userId:data._id},process.env.JWT_SECRET);

              res.cookie('token',token,{
                     httpOnly:true,
                     secure:process.env.NODE_ENV==='production',
                     maxAge:30*24*60*60*1000,
              })


              const {hashPassword,...info} = data.toObject(); 
              
              return res.status(201).json(info);

}

export const loginUser = async(req,res)=>{
       const  {password,email} = req.body;
       
               
       if(!email || !password ){
              return res.status(400).json({message:'All fields are required!'});
       }

       const user = await User.findOne({email});

       if(!user){
              return res.status(401).json({message:'Invalid email!'});
       }
       

       const pwd = await bcrypt.compare(password,user.hashPassword);

       if(!pwd){
            return  res.status(401).json({message:'Invalid email or password!'})
       }

       const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);

       res.cookie('token',token,{
              httpOnly:true,
              secure:process.env.NODE_ENV==='production',
              maxAge:30*24*60*60*1000,
       })
             
       const {hashPassword,...info} = user.toObject(); 
              
       return res.status(200).json(info);

       
}

export const logoutUser = async(req,res)=>{
        res.clearCookie("token");

        res.status(200).json({message:'Logout successfully'});
}