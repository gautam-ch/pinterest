import './postPage.css'
import Comment from '../../components/comment/comment'
import Image from '../../components/image/image'
import PostInteraction from '../../components/postInteraction/postInteraction'
import {Link} from 'react-router';

const PostPage=()=>{
    return(
        <div className="PostPage">

            <div className='leftArrow'>
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
                <Image path='/pins/pin1.jpeg' alt="img" w="736" />
                </div>
                <div className="postDetails">
                      <PostInteraction/>
                     <Link to='/gautam' className="Avatar" >     
                         <Image path='/general/noAvatar.png' alt="avator" />
                         <span>Gautam Chouhan</span>
                     </Link>
                
                      <Comment/>
        
                </div>
              </div>
        </div>
    )
}

export default PostPage;