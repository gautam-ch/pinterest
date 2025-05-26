import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const SaveSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    pin:{
        type:Schema.Types.ObjectId,
        ref:'Pin',
        required:true
    }
},{
    timestamps:true
})


export default mongoose.model('Save',SaveSchema);