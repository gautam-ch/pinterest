import {User} from '../models/user.model.js'

export const getUser =async(req,res)=>{
       const {username} = req.params;
         
       const user = await User.findOne({username});

       const {hashPassword,...data} = user.toObject();

       res.status(200).json(data);

}