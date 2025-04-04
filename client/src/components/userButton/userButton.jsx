import { useState } from 'react';
import './userButton.css';

const UserButton=()=>{
    const [open,setOpen] = useState(false);
    
    // temp-user
    const current =true;
       return(
           
          current?(
            <div className='userButton'>
              <img src='/general/noAvatar.png'></img>
              <img onClick={()=>{setOpen((prev)=>(!prev))} } src='/general/arrow.svg' className='arrow'></img>
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