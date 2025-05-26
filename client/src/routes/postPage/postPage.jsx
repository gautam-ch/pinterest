import './postPage.css';
import Comment from '../../components/comment/comment';
import Image from '../../components/image/image';
import PostInteraction from '../../components/postInteraction/postInteraction';
import {useQuery} from '@tanstack/react-query';
import {Link,useParams,useNavigate} from 'react-router';
import apiCall from '../../utils/apiRequest';


const fetchPin=async({id})=>{
             
    try{
        const res = await apiCall.get(`/pins/${id}`);
        return res.data;
    }
    catch(err){
        console.log('fetching single pin ',err);
    }
}


const PostPage=()=>{
    const navigate= useNavigate();
    const handleArrow =()=>{
        navigate(-1);
    }

    const {id} = useParams();
  
//    console.log(id);

    const {isPending,error,data}=useQuery({
        queryKey:['pin',id],
        queryFn:()=>( fetchPin({id})) 
    });

    if(isPending) return 'Loading...';
    if(error) return 'Something went wrong!';
    if(!data) return 'Pin not found';


   
    console.log(data);
    return(
        <div className="PostPage">

            <div className='leftArrow' onClick={handleArrow}>
            <svg
                height="20"
                viewBox="0 0 24 24"
                width="20"
                style={{ cursor: "pointer" }}
            >
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
            </div>  
              
              <div className="postContainer">
                 
                 <div className='postImg'>
                <Image path={data.media} alt="img" w="736" />
                </div>
                <div className="postDetails">
                      <PostInteraction postId={id}/>
                     <Link to={`/${data.user.username}`} className="Avatar" >     
                         <Image path={data.user.img || "/general/noAvatar.png"} />
                         <span>{data.user.displayName}</span>
                     </Link>
                
                      <Comment postId={data._id}/>
        
                </div>
              </div>
        </div>
    )
}

export default PostPage;