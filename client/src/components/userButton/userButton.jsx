import { useState } from 'react';
import './userButton.css';
import  Image  from '../../components/image/image';
const UserButton=()=>{
    const [open,setOpen] = useState(false);
    
    // temp-user
    const current =true;
       return(
           
          current?(
            <div className='userButton'>
              <Image path='/general/noAvatar.png'/>
              <div onClick={()=>{setOpen((prev)=>(!prev))}} >
                 <Image  path='/general/arrow.svg' className='arrow'/>
              </div>
              {
                open&&
                    <div className='userOptions'>
                    <div className='userOption'>profile</div>
                    <div className='userOption'>setting</div>
                    <div className='userOption'>log out</div>
                </div>   
               }
              
            </div>
          ):( 
             <a  className='loginLink'
                href='/'>Login / Sign Up
             </a>
          )
       )
}

export default UserButton