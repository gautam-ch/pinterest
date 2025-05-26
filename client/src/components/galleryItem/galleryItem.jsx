
import './galleryItem.css'
import  {Link} from 'react-router'
import  Image  from '../../components/image/image';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import apiCall from '../../utils/apiRequest';
import useAuthStore from '../../utils/authStore';
 const GalleryItem=({item})=>{

    const queryClient = useQueryClient();
     const mutation = useMutation({
        mutationFn:({id,type})=>(apiCall.post(`/pins/checkLike/${id}`,{type})),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['save',item._id]});
        }
     })
     const optimizedheight=372*item.height/item.width;

       const {currentUser} = useAuthStore();
        
       let proc=true,err=true,dt;
       if(currentUser!=null){
        const {isPending,error,data}= useQuery({
            queryKey:['save',item._id],
            queryFn:()=>(apiCall.get(`/pins/checkLike/${item._id}`).then((res)=> res.data))
        })
        proc=isPending;
        err=error;
        dt=data;
        console.log(data);
       }

     
    return(
        <div className="galleryItem" style={{gridRowEnd:`span ${Math.ceil(item.height/100)}`} }>
            
            
              <Image path={item.media}  alt="test" w={372} h={optimizedheight}/>
                <Link to={`/pin/${item._id}`} className='overlay'/>

                 {(proc|| err)?'':(
                           <button className='saveButton' onClick={()=>{mutation.mutate({id:item._id,type:'Save'})} }>{dt.isSaved?'Saved':'Save'}</button>
                 ) }  
                <div className='overlayIcons'>
                    <button>
                        <Image alt="" path='/general/share.svg'/>
                    </button>
                    <button>
                        <Image path='/general/more.svg' alt=''/>
                    </button>

                </div>

            </div>
            

    )
}
export default GalleryItem;