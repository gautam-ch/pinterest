import mongoose from "mongoose";
import { Schema } from "mongoose";


const commentSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    pin:{
        type:Schema.Types.ObjectId,
        ref:"Pin",
        required:true
    },

},{
    timestamps:true
})

export const Comment = mongoose.model('Comment',commentSchema);