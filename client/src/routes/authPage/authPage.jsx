import './AuthPage.css'
import Image from '../../components/image/image';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import apiCall from '../../utils/apiRequest';
import useAuthStore from '../../utils/authStore';


const AuthPage=()=>{
    const [isAccount,setIsAccount] = useState(true);
    const [error,setError] = useState("");
    const navigate=useNavigate();
    const {setCurrentUser} =useAuthStore();

    const handleSubmit =async(e)=>{
       e.preventDefault();

       const formData = new FormData(e.target);

        const data =  Object.fromEntries(formData);

        // console.log(data);

        try{
              
            const res = await  apiCall.post(`/users/auth/${isAccount?'login':'register'}`,data);

            // console.log('res ',res)
             setCurrentUser(res.data);
             navigate('/');
                

        }
        catch(error){
            console.log('error in userRegister ',error);

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            
        }
    }

    return(
        <div className="AuthPage">
             <div className="authBox">
                <Image path='/general/logo.svg' w={36} h={36} />

                   <h1>{isAccount?'Login to your account':'Create an Account'}</h1>

                   {
                      isAccount?(
                         <form key='login' onSubmit={handleSubmit} >
                                
                            <label forhtml='email'>Email</label>  
                            <input type='email' placeholder='Email' required  id='email' name='email'/>

                            <label forhtml='password'>Password</label>  
                            <input type='password' placeholder='password' required  id='password' name='password'/>

                            <button type='submit'>Log In</button>
                            <p onClick={()=>(setIsAccount(false),setError(""))}>Don't have an account ? <b>Sign Up</b></p>
                            {error && <p className='error'>{error}</p>} 

                          </form>                   
                      ):(
                        <form key='Signup' onSubmit={handleSubmit}>

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