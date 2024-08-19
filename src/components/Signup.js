
import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { addUser } from '../features/userSlice';
import './Signup.css'; 
import myImage from '../assets/images/pexels-rebrand-cities-581004-1367272.jpg';


export default function Signup() {
  const [searchParams] = useSearchParams();
  const [formData,setFormData] = useState({full_name:"",phone_number:"",email:"",password:"",confirmPassword:"",profilePicture:""})
  const token = searchParams.get('token');
  const [validationError,setValidationError] = useState()
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  
   
    if (formData.password === formData.confirmPassword)  {
      fetch("https://my-duka-back-end.vercel.app/signup",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...formData,token:token})
      })
      .then(res=>res.json())
      .then(data=>{
       
        
        localStorage.setItem("access_token", data.access_token);
        let loggedIn = data.user
        dispatch(addUser(loggedIn))
        
        if (loggedIn.role === "Clerk"){
          
          navigate(`/clerk/${loggedIn.id}`)
        }
        else if(loggedIn.role === "Admin"){
          navigate(`/admin/${loggedIn.id}`)
        }
        else if(loggedIn.role === "Merchant"){
          navigate("/merchant")
        }
        else{
          navigate("/")
        }
    
        
      })
      .catch(error=>console.log(error)
      )
      

    }
    else{
      setValidationError("Passwords do not match")

    }
   
   
  }


  useEffect(() => {
    fetch('https://my-duka-back-end.vercel.app/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          setValidToken(true);
        } else {
          setValidToken(false);
        }
      });
  }, [token]);

  console.log(token);
  


  return (
    <div className="container">
      
      <div className="combined-section">
        
        <div className="welcome-section">
          <h1 className="title">Welcome to MyDuka</h1>
          <img src={myImage} style={{width:"100%"}} alt="Background" />
          <p className="description">
            Join us to manage your inventory efficiently and grow your business.
          </p>
        </div>

        
        {validToken ? (<div className="signup-section">
          <div className="signup-form-container">
            <h2 className="form-title">Create Account</h2>
            <form onSubmit={handleSignUp} className="signup-form">
              <div className="input-group">
                <UserIcon className="icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input"
                  onChange={handleChange}
                  name = "full_name"
                  value={formData.full_name}
                />
              </div>
              <div className="input-group">
                <UserIcon className="icon" />
                <input
                  type="text"
                  placeholder="Image link"
                  className="input"
                  onChange={handleChange}
                  name = "profilePicture"
                  value={formData.profilePicture}
                />
              </div>
              

              <div className="input-group">
                <PhoneIcon className="icon" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input"
                  onChange={handleChange}
                  name = "phone_number"
                  value={formData.phone_number}
                  
                />
              </div>
              <div className="input-group">
                <MailIcon className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  name = "email"
                  onChange={handleChange}
                  value={formData.email}
             
                />
              </div>
              <div className="input-group">
                <LockIcon className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  name = "password"
                  onChange={handleChange}
                  value={formData.password}
               
                />
              </div>
              <div className="input-group">
                <LockIcon className="icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  onChange={handleChange}
                  name='confirmPassword'
                  value={formData.confirmPassword}
             
                />
              </div>
              <button type="submit" className="submit-button small-button">
                CREATE ACCOUNT
              </button>
            </form>
            <p className="login-link">
              Already have an account?{" "}
              <p
                className="login-button"
                onClick={() => navigate("/login")}
                style={{cursor:"pointer", textDecoration:"none"}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Log In
              </p>
            </p>
           
          </div>
          <p>{validationError}</p>
        </div>):<p>Invalid token</p>}
      </div>
    </div>
  );
}



function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
