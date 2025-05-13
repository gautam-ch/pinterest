import './collections.css'
import  Image from '../../components/image/image';
import { useQuery } from '@tanstack/react-query';
import apiCall from '../../utils/apiRequest';
import {format} from 'timeago.js';
import {Link} from  'react-router-dom';

const Collections=({userId})=>{

     const {data,error,isPending} = useQuery({
        queryKey:['board',userId],
        queryFn:()=> apiCall.get(`/boards/user/?userId=${userId}`).then((res)=>{ return res.data})
     })
     
     if(isPending) return <div>Loading..</div>
     if(error) return <div>Something went Wrong!</div>

     console.log('boards : ',data);
      
     let arr=data.boardDetails;
     

    return (
        <div className="collections">
        
        {
                arr.map(board=>(
                    <Link to={`/search/?boardId=${board._id}`}  className='collection' key={board._id}>

                    <Image src={board.firstPin.media}/>

                    <div className="collectionInfo">

                        <span>{board.title}</span>
                        <span>{board.pinCount} Pins . {format(board.createdAt)}</span>
                    </div>
                    
                    </Link>
                
                ))
        }       
        </div>
       
    
    )
}

export default Collections