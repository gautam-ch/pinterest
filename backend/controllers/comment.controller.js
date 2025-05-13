 import {Comment} from '../models/comment.model.js';

export const getComments =async(req,res)=>{
      const postId= req.query.postId;

      const data = await Comment.find({pin:postId}).populate('user','displayName img username').sort({createdAt:-1});
      return res.status(200).json(data);
}


export const postComment =async(req,res)=>{

      const {description,pinId}=req.body;
       

           const data = await Comment.create({
                  description,
                  pin:pinId,
                  user:req.userId
            })
              return res.status(200).json(data);

}

export const delComment = async(req,res)=>{
      
      const {cmntId}=req.body;
      const id = req.userId;
      
      if(!id || ! cmntId) return res.status(400).json({message:'Not authenticated to delete the comment'});

      const data = await Comment.deleteOne({
                 _id:cmntId,
                 user:id
      })

      if(data.deletedCount===0){
            return res.status(404).json({message:'comment not found or not authorized user'});
      }
             
      return res.status(200).json(data);
}