import './comment.css'
import Image from '../../components/image/image'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
const Comment=()=>{

    const [close,setClose] = useState(false);
      
    return(
        <div className='comments'>

            <div className='commentList'>

                <span className='commentCount'>7  Comments</span>

                {/* comment */}
                    <div className="comment">
                         <Image path='general/noAvatar.png' />

                         <div className="commentContain">
                            <span className='username'>Rishi</span>
                            <p className='description'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipisicing elit. Alias soluta voluptatem cum 
                            </p>
                            <span className='time'>1hr</span>
                         </div>
                    </div>
                    {/* cmm */}
                    <div className="comment">
                         <Image path='general/noAvatar.png' />

                         <div className="commentContain">
                            <span className='username'>Rishi</span>
                            <p className='description'>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipisicing elit. Alias soluta voluptatem cum 
                            </p>
                            <span className='time'>1hr</span>
                         </div>
                         
                         
                    </div>

                  
            </div>
                    <form className='commentForm'>
                        <input type='text' placeholder='Add a comment'></input>
                        <div className='emoji' onClick={()=>setClose((prev)=>(!prev)) }>
                            <div style={{fontSize:'18px'}}>😉</div>
                            {close &&
                                <div className="emojiPicker">
                                <EmojiPicker/>
                            </div>
                            }
                        </div>
                    </form>
          
        </div>
    )
}

export default Comment;