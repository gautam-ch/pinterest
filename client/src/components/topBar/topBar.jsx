import UserButton from '../userButton/userButton';
import './topBar.css';
import  Image  from '../../components/image/image';

const TopBar=()=>{
    return(
        <div className='topBar'>
            
            <div className='search'>
               
               <Image path='/general/search.svg' alt=''/>
               <input type='text' placeholder='Search'></input>
               
            </div>

            <div className='user'>
                <UserButton/>
            </div>
            

        </div>
    )
}

export default TopBar;