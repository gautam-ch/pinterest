import sharp from 'sharp';
import {Pin} from  '../models/pin.model.js';
import Imagekit from 'imagekit';
import { Board } from '../models/board.model.js';
import Like from '../models/like.model.js';
import Save from '../models/save.model.js';
import jwt from 'jsonwebtoken';

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

    // await new Promise(resolve=>setTimeout(resolve,2000));

    res.status(200).json({pins,nextCursor:hasNextPage?pageNumber+1:null});
}

export const getPin=async(req,res)=>{
       const {id} =req.params;
       
       const data = await Pin.findById(id).populate('user',"username displayName img");

       res.status(200).json(data);
}

export const createPin=async(req,res)=>{
       const {title,description,link,board,tags,textOptions,canvasOptions,newBoard} = req.body;

       const file=req.files.file;

       if(!title || !description || !file){
          return  res.status(400).json({message:'All fields are required !'});
       }

       const parsedText = JSON.parse(textOptions || "{}");
       const parsedCanva = JSON.parse(canvasOptions || "{}");

        const metadata = await sharp(file.data).metadata();
           
        const oreintation=metadata.width >metadata.height?'landscape':'portrait';
        const aspectRatio=metadata.width/metadata.height;

        let clientAspectRatio;
        let width;
        let height;

        if(parsedCanva.size!=='original'){
            clientAspectRatio= parsedCanva.size.split(':')[0]/parsedCanva.size.split(':')[1];
        }
        else{
              if(parsedCanva.oreintation){
                parsedCanva.oreintation===oreintation?(clientAspectRatio=aspectRatio):(clientAspectRatio=1/aspectRatio);
              }
              else{
                clientAspectRatio=aspectRatio;
              }
        }

        width=metadata.width;
        height=metadata.width/clientAspectRatio;
           
           const imagekit = new Imagekit({
             publicKey:process.env.IK_PUBLIC_KEY,
             privateKey:process.env.IK_PRIVATE_KEY,
             urlEndpoint:process.env.IK_URL_ENDPOINT
           })
           

           const left = Math.round((parsedText.left*width)/375);
           const top=Math.round((parsedText.top * height)/parsedCanva.height);

           let croppingStrategy = "";

           if (parsedCanva.size !== "original") {
             if (aspectRatio > clientAspectRatio) {
               croppingStrategy = ",cm-pad_resize";
             }
           } else {
            if (
              (oreintation === "landscape" && parsedCanva.orientation === "portrait")
            ) {
              croppingStrategy = ",cm-pad_resize";
            }
           }
          //  console.log(croppingStrategy);
          //  console.log(parsedCanva);
          //  console.log(aspectRatio ,clientAspectRatio);


           const transformation =`w-${width},h-${height}${croppingStrategy},bg-${parsedCanva.backgroundColor.substring(1)}${
                                    parsedText.text?`,l-text,i-${parsedText.text},fs-${parsedText.fontSize *2.1},lx-${left},ly-${top},co-${parsedText.color.substring(1)},l-end`:""  
                                  }`;

            //  console.log(transformation);
            imagekit.upload({
              file:file.data,
              fileName:file.name,
              folder:'pins',
              transformation:{
                pre:transformation
              }
            }).then(async(response)=>{
              let newBoardId;

              if (newBoard) {
                const res = await Board.create({
                  title: newBoard,
                  user: req.userId,
                });
                newBoardId = res._id;
              }
        
              const newPin = await Pin.create({
                user: req.userId,
                title,
                description,
                link: link || null,
                board: newBoardId || board || null,
                tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
                media: response.filePath,
                width: response.width,
                height: response.height,
              });
              return res.status(201).json(newPin);
            }).catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            })
      
      }


export const checkLike = async(req,res)=>{
            const {id} = req.params;
            const token = req.cookies.token;
              
            const likeCount = await Like.countDocuments({pin:id});   

            if(!token){
                return  res.status(200).json({likeCount,isLiked:false,isSaved:false});
            }

            jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
              
              if(err){
                     return res.status(200).json({likeCount,isLiked:false,isSaved:false});
              }
                  
             const userId=payload.userId;
                  
                   const isLiked = await Like.findOne({pin:id,user:userId});
                   const isSaved = await Save.findOne({pin:id,user:userId});

                   return res.status(200).json({likeCount,isLiked:isLiked?true:false,isSaved:isSaved?true:false});
           });

}

export const doLike=async(req,res)=>{
       const {id} = req.params;

       const {type}=req.body;

          // console.log(type);
       if(type==="Like"){
             
             const isLike = await Like.findOne({pin:id,user:req.userId});

             if(isLike){
                 await Like.deleteOne({pin:id,user:req.userId});
             }
             else{
                 await Like.create({pin:id,user:req.userId});
             }
       }else{
          
                
                const isSaved = await Save.findOne({pin:id,user:req.userId});

                if(isSaved){
                    await Save.deleteOne({pin:id,user:req.userId});
                }
                else{
                    await Save.create({pin:id,user:req.userId});
                }
       }  

      

       return res.status(200).json({message:'Sucessfull'});
}