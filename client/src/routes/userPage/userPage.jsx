import './userPage.css'
import { useState } from 'react';
import Image from '../../components/image/image';
import Gallery from '../../components/gallery/gallery';
import Collections from '../../components/collections/collections';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import apiCall from '../../utils/apiRequest';

const fetchUser=async({username})=>{
             
    try{
        const res = await apiCall.get(`/users/${username}`);
        return res.data;
    }
    catch(err){
        console.log('fetching user ',err);
    }
}

const UserPage=()=>{
     const [type,setType] = useState('saved');
     const {username} = useParams();
  
     console.log(username);

    const {isPending,error,data}=useQuery({
        queryKey:['profile',username],
        queryFn:()=>( fetchUser({username})) 
    });

    if(isPending) return 'Loading...';
    if(error) return 'Something went wrong!';
    if(!data) return 'User not found';

    //  console.log('userdetails',data);
    return(
        <div className="UserPage">
             <Image src={ `${data.img}` || '/general/noAvatar.png'} className='avatar'/>
             <span className='un'>{data.displayName}</span>
             <span className='userId'>{`@${data.username}`}</span>
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
                 {type==='created'?<Gallery userId={data._id}/>:<Collections/>}
              </div>

         </div>
    )
}

export default UserPage;