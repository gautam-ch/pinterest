import mongoose from "mongoose";
import { Schema } from "mongoose";


const boardSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{
    timestamps:true
})

export const Board = mongoose.model('Board',boardSchema);