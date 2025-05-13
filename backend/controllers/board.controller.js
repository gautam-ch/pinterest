import {Board} from '../models/board.model.js';
import { Pin } from '../models/pin.model.js';
import mongoose from 'mongoose';


export const getBoard =async(req,res)=>{
    
     const userId = req.query.userId;
     // const board = await  Board.find({user:userId});
     
     // Promise.all is used to take array of promise , and return  single promise
     // parallel execution is the reason

     // const boardDetails = await Promise.all(board.map(async(board)=>{
           
     //      const pinCount = await Pin.countDocuments({board:board._id});
     //      const firstPin = await Pin.findOne({board:board._id});

     //      return {
     //           ...board.toObject(),
     //           pinCount,
     //           firstPin
     //      }
     // }))

     //  can use aggregate : 

     const boardDetails = await Board.aggregate([
          {$match: {user:new mongoose.Types.ObjectId(userId)} },
          {
               $lookup:{
                    from:'pins',
                    localField:'_id',
                    foreignField:'board',
                    as:'pins',
               }
          },
          {
               $addFields:{
                    pinCount:{$size:'$pins'},
                    firstPin:{$arrayElemAt:['$pins',0]}
               }
          },
          {
               $project:{
                    _id:1,
                    createdAt:1,
                    title:1,
                    user:1,
                    pinCount:1,
                    firstPin:1,
               }
          }
     ]);

     return  res.status(200).json({boardDetails});

}