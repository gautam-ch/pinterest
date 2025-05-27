import {User} from '../models/user.model.js'
import follow from '../models/follow.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUser =async(req,res)=>{
       const {username} = req.params;

       const user = await User.findOne({username});
       const {hashPassword,...data} = user.toObject();

       const followerCount = await follow.countDocuments({following:user._id});
       const followingCount = await follow.countDocuments({follower:user._id});

       const token=req.cookies?.token;

       if(token){
              jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
              
                     if(!err){
                           const isFollow = await follow.exists({following:user._id,follower:payload.userId});

                           return res.status(200).json({...data,followerCount,followingCount,isFollow:isFollow?true:false});
                     }                     
              })
       }
       else{
              return res.status(200).json({...data,followerCount,followingCount,isFollow:false});
       }

}

export const followUser =async(req,res)=>{
       const {username} = req.params;
       
       const id = await User.findOne({username}).select('_id');

       if(id.equals(req.userId)){
              return res.status(403).json({message:"Can't follow self!"});
       }

       const isFollow = await follow.findOne({
              follower:req.userId,
              following:id
       })

       if(isFollow){

              const data = await follow.deleteOne({
                     follower:req.userId,
                     following:id
              })

       }
       else{
              const data = await follow.create({
                     follower:req.userId,
                     following:id
              })
       }
       return res.status(200).json({message:'Successfully follow/unfollow'});
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
                     sameSite: 'None',
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
              sameSite: 'None',
              maxAge:30*24*60*60*1000,
       })
             
       const {hashPassword,...info} = user.toObject(); 
              
       return res.status(200).json(info);

       
}

export const logoutUser = async(req,res)=>{
        res.clearCookie("token");

        res.status(200).json({message:'Logout successfully'});
}