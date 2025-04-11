import './AuthPage.css'
import Image from '../../components/image/image';
import { useState } from 'react';

const AuthPage=()=>{
    const [isAccount,setIsAccount] = useState(true);
    const [error,setError] = useState("k");

    return(
        <div className="AuthPage">
             <div className="authBox">
                <Image path='/general/logo.png' w={36} h={36} />

                   <h1>{isAccount?'Login to your account':'Create an Account'}</h1>

                   {
                      isAccount?(
                         <form key='login' >
                                
                            <label forhtml='email'>Email</label>  
                            <input type='email' placeholder='Email' required  id='email' name='email'/>

                            <label forhtml='password'>Password</label>  
                            <input type='password' placeholder='password' required  id='password' name='password'/>

                            <button type='submit'>Log In</button>
                            <p onClick={()=>(setIsAccount(false))}>Don't have an account ? <b>Sign Up</b></p>
                            {error && <p className='error'>{error}</p>} 

                          </form>                   
                      ):(
                        <form key='Signup'>

                            <label forhtml='username'>Username</label>  
                            <input type='text' placeholder='username' required  id='username' name='username'/>    

                            <label forhtml='name'>Name</label>  
                            <input type='text' placeholder='name' required  id='name' name='name'/>
                             

                            <label forhtml='email'>Email</label>  
                            <input type='email' placeholder='Email' required  id='email' name='email'/>

                            <label forhtml='password'>Password</label>  
                            <input type='password' placeholder='password' required  id='password' name='password'/>

                            <button type='submit'>Sign Up</button>
                            <p onClick={()=>(setIsAccount(true))}>Already have an account ? <b>Log In</b></p>
                            {error && <p className='error'>{error}</p>} 

                        </form>
                      )
                   }

                   

             </div>
        </div>
    )
}

export default AuthPage;