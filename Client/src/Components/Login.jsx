
import React, { useState, useContext } from 'react';
import CoverImage from '../assets/cover_image.jpeg'
import LoginLogo from '../assets/login_logo.jpg'
import GOOGLE_ICON from '../assets/google-icon-logo.svg'
import { AuthenticationContext } from './AuthenticationProvider'


const Login = () => {

   // State to store email and password
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
 
   // Function to handle email input change
   const handleEmailChange = (event) => {
     setEmail(event.target.value);
   };
 
   // Function to handle password input change
   const handlePasswordChange = (event) => {
     setPassword(event.target.value);
   };
 
   // Function to handle form submission
   const handleSubmit = async (event) => {
     event.preventDefault(); // Prevent the default form submission behavior
 
     // Call your API here, passing the email and password
     try {
       const response = await fetch('https://your-api-endpoint.com/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
       });
       const data = await response.json();
       console.log('API response:', data);
       // Handle the API response accordingly (e.g., redirect user on successful login)
     } catch (error) {
       console.error('Error:', error);
       // Handle errors
       if (error.message.includes('email')) {
         setError('Error in email: ' + error.message);
       } else if (error.message.includes('password')) {
         setError('Error in password: ' + error.message);
       } else {
         setError('An error occurred. Please try again.');
       }
     }
    
  };



  
  return (

    <>  
    <form onSubmit={handleLogin}>   
    
    <div className="w-full h-screen  flex items-start">


     <div className='relative w-1/2 h-full flex flex-col'>
      <img src={CoverImage} className="w-full h-full object-cover" />
     </div>

      <div className='w-1/2 h-full bg-[#F7F7F7] flex flex-col p-20 justify-between items-center'>
        
        <div className='w-151 h-90 mr-auto   '>
        <img src={LoginLogo} className='absolute top-[-10px]'/>  

        </div>
          

        <div className='w-full flex flex-col max-w-[500px] '>

          <div className='w-full flex flex-col mb-2'>

          <h3 className='text-3xl font-semibold mb-2 '>Login</h3>

          <p className='text-base mb-2 '> welcome back! please enter your details</p>

          </div>

          <div className='w-full flex flex-col'>

            <input 
            
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
             />

             <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
             />

             

          </div>

          <div className='w-full flex items-center justify-between'>

            <div className='w-full flex items-center ' >

              <input type="checkbox" className='w-4 h-4 mr-2' />

              <p className='text-sm'>Remember Me </p>

            </div>

            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2  hover:text-white'>Forget Password?</p>

          </div>

          <div className='w-full flex flex-col my-4'>

            <button type='submit' className='w-full text-white my-2 font-semibold bg-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-black hover:text-white'>
             
             login

            </button>

            <button className='w-full text-black my-2 font-semibold bg-white border-2 border-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-[#2E5834] hover:text-white'>
             
             Register

            </button>

          </div>

          <div className='w-full flex items-center justify-center relative py-2'>

            <div className='w-full h-[1PX] bg-black '> </div>

            <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'> or</p>

          </div>

          <button className='w-full text-black my-2 font-semibold bg-white border-2 border-[#2E5834] rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-black hover:text-white '>
             
             <img src={GOOGLE_ICON} className="h-6 mr-2" />
             Sign In With Google

            </button>



          
          

        </div>

        <div className='w-full flex items-center justify-center'>

          <p className='text-sm font-normal text-[#060606] '>Dont have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer  hover:text-white'>sign up for free</span> </p>

        </div>
        
        </div> 
      
      </div>

      {error && <p>{error}</p>}

      </form>
  </>
  )
}

export default Login