import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import apiCall from '../../utils/apiRequest.js';
import {useMutation,useQueryClient} from '@tanstack/react-query';


const addComment=async(comment)=>{
       
    const res = await apiCall.post(`/comments/`,comment);

    return res.data;
}


export  const CommentForm= ({postId})=>{
    const [close,setClose] = useState(false);
    const [desc,setDesc] = useState("");
    
    const queryClient = useQueryClient();

     const mutation = useMutation({
        mutationFn:addComment,
        onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:['comment',postId]})
              setDesc("");
              setClose(false);
            }
     })

            
        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                  mutation.mutate({
                    description:desc,
                    pinId:postId
                  })
            }
            catch(e){
                console.log('error during comment',e);
            }
        }



    const handleClick=(e)=>{
         setDesc(prev=>prev + " " +e.emoji);
         setClose(false);
    }
    return (
        <form className='commentForm' onSubmit={handleSubmit}>
            <input type='text' placeholder='Add a comment' onChange={(e)=>(setDesc(e.target.value))} value={desc}></input>
            <div className='emoji' onClick={()=>setClose((prev)=>(!prev)) }>
                <div style={{fontSize:'18px'}}>😉</div>
                {close &&
                    <div className="emojiPicker">
                    <EmojiPicker onEmojiClick={handleClick}/>
                </div>
                }
            </div>
       </form>
    )
}