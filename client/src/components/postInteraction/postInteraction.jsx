import './postInteraction.css'
import Image from '../../components/image/image'
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import apiCall from '../../utils/apiRequest'


const addLike = async(id,type)=>{
      
    const res = await apiCall.post(`pins/checkLike/${id}`,{type:type});

    return res.data;
}

const PostInteraction=({postId})=>{

    const queryClient = useQueryClient();

    const mutation = useMutation({
         mutationFn:({id,type})=>(addLike(id,type)),
         onSuccess:()=>{
              queryClient.invalidateQueries({queryKey:['interaction',postId]});
         }
    });

    const {isPending,data,error} = useQuery({
        queryKey:['interaction',postId],
        queryFn:()=> apiCall.get(`/pins/checkLike/${postId}`).then((res)=> res.data)
        
    })

    const handleLike=(id)=>{
           
        mutation.mutate({id,type:"Like"});
    }
      
      
    if(isPending || error) return ;



    return(
        <div className='container'>

            <div className="Icons" onClick={()=>{handleLike(postId)} }>
              
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke={data.isLiked?'#e50829':"#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    fill={data.isLiked?'#e50829':'none'}
                    />
            </svg>
               <span>{data.likeCount}</span>
              <Image path="/general/share.svg" alt=""/>
              <Image path="/general/more.svg" alt=""/>
            </div>
            <button   disabled={mutation.isPending} onClick={()=>{mutation.mutate({id:postId,type:"Save"})} }>
                {data.isSaved?'Saved':'Save'}
            </button>
           
        </div>
    )
}

export default PostInteraction;