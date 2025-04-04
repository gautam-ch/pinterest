import UserButton from '../userButton/userButton';
import './topBar.css';

const TopBar=()=>{
    return(
        <div className='topBar'>
            
            <div className='search'>
               
               <img src='/general/search.svg' alt=''></img>
               <input type='text' placeholder='Search'></input>
               
            </div>

            <div className='user'>
                <UserButton/>
            </div>
            

        </div>
    )
}

export default TopBar;