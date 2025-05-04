import mongoose from "mongoose";
import { Schema } from "mongoose";


const pinSchema = new Schema({
    media:{
        type:String,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    tags:{
        type:[String]
    },
    board:{
        type:Schema.Types.ObjectID,
        ref:"Board"
    },
    user:{
        type:Schema.Types.ObjectID,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export const Pin = mongoose.model('Pin',pinSchema);