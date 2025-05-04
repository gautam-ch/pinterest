
import mongoose from 'mongoose';


export const dbConnect =async()=>{

    try{
          
        await mongoose.connect(process.env.MONGO);
         
        console.log('mongodb connected successfully');
    }
    catch(err){
        console.log('mongoDb connection error ',err);
    }

}

