import './postInteraction.css'
import Image from '../../components/image/image'

const PostInteraction=()=>{
      
    return(
        <div className='container'>

            <div className="Icons">
              
              <Image path="/general/react.svg" alt=""/>
               <span>273</span>
              <Image path="/general/share.svg" alt=""/>
              <Image path="/general/more.svg" alt=""/>
            </div>
            <button>Save</button>
           
        </div>
    )
}

export default PostInteraction;