import UserButton from '../userButton/userButton';
import './topBar.css';
import {useNavigate} from 'react-router';
import  Image  from '../../components/image/image';

const TopBar=()=>{
      
    const navigate = useNavigate();

     const handleSubmit=(e)=>{
           e.preventDefault();
           
           navigate(`/search?search=${e.target[0].value}`);
     }     
       
    return(
        <div className='topBar'>
            
            <form onSubmit={handleSubmit} className='search'>
               
               <Image path='/general/search.svg' alt=''/>
               <input type='text' placeholder='Search'></input>
               
            </form>

            <div className='user'>
                <UserButton/>
            </div>
            

        </div>
    )
}

export default TopBar;