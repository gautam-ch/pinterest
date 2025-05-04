import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    displayName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    hashPassword:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

export const User = mongoose.model('User',userSchema);