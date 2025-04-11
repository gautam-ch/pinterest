import './userPage.css'
import { useState } from 'react';
import Image from '../../components/image/image';
import Gallery from '../../components/gallery/gallery';
import Collections from '../../components/collections/collections';
const UserPage=()=>{
    const [type,setType] = useState('saved');
    return(
        <div className="UserPage">
             <Image path='/general/noAvatar.png' className='avatar'/>
             <span className='un'>Palak Chouhan</span>
             <span className='userId'>@palak_0123</span>
             <div className='followCount'> 124 followers . 20 following</div>
             <div className='userIcons'>
                 <Image path='/general/share.svg'/>
                 <div className='userButton'>
                    <button>Message</button>
                    <button >Follow</button>
                 </div>
                 <Image path='/general/more.svg'/>
             </div>
           
             <div className='profileOptions'>
                <span  onClick={()=>{setType('created')} } className={type==='created'?'active':""}>Created</span>
                <span  onClick={()=>{setType('saved')} } className={type==='saved'?'active':""}>Saved</span>
              </div>

              <div>
                 {type==='created'?<Gallery/>:<Collections/>}
              </div>

         </div>
    )
}

export default UserPage;