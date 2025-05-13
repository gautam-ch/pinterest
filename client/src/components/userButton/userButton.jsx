import { useState } from 'react';
import './userButton.css';
import  Image  from '../../components/image/image';
import apiCall from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../utils/authStore';
import { Link } from 'react-router-dom';

const UserButton=()=>{
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const  {removeCurrentUser,currentUser} = useAuthStore();

    const handleClick=async()=>{
          
      try{
            await apiCall.post('/users/auth/logout',{});
            removeCurrentUser();
            navigate('/auth');
      }
      catch(err){
         console.log(err);

      }
    }
    

    // temp-user
    const current =currentUser;
   //  console.log(current);
       return(
           
          current?(
            <div className='userButton'>
              <Image path={current.img || '/general/noAvatar.png'}/>
              <div onClick={()=>{setOpen((prev)=>(!prev))}} >
                 <Image  path='/general/arrow.svg' className='arrow'/>
              </div>
              {
                open&&
                    <div className='userOptions'>
                    <Link to={`/${current.username}`} className='userOption'>profile</Link>
                    <div className='userOption'>setting</div>
                    <div className='userOption' onClick={handleClick}>log out</div>
                </div>   
               }
              
            </div>
          ):( 
             <Link  className='loginLink'
                to='/auth'>Login / Sign Up
             </Link>
          )
       )
}

export default UserButton