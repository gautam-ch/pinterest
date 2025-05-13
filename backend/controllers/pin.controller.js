import {Pin} from  '../models/pin.model.js';

export const getPins =async(req,res)=>{
    
    const pageNumber = Number(req.query.cursor) || 0;
    const search = req.query.search;
    const userId = req.query.userId;
    const boardId = req.query.boardId;
    let offset = pageNumber*21;
    
          const pins = await Pin.find(
            
            search?
            {
               $or:[
                 {title: {$regex:search ,$options:"i"} },
                 {tags:{$in:[search]} }
               ]

          }:   userId?
              {user:userId}:boardId?{board:boardId}:{}
          
        ).limit(21).skip(offset)
  
    // const pins = await Pin.find()        
    const hasNextPage = pins.length===21;

    await new Promise(resolve=>setTimeout(resolve,2000));

    res.status(200).json({pins,nextCursor:hasNextPage?pageNumber+1:null});
}

export const getPin=async(req,res)=>{
       const {id} =req.params;
       
       const data = await Pin.findById(id).populate('user',"username displayName img");

       res.status(200).json(data);
}