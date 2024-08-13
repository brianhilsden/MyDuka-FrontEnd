import React, { useState } from 'react';
import { useNavigate  , useLocation, Form} from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import axios, { Axios } from 'axios';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error,setError] = useState()
  const location = useLocation();
  const role = location.state?.role || "user"

  
  

  const [formData,setFormData] = useState({email:"",password:""})

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleLogin = (e) => {
    e.preventDefault();
 
    fetch("https://my-duka-back-end.vercel.app/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData,role:role})
    })
    .then(res => {
      if (!res.ok) {
        setError("Unauthorized")
      }
      return res.json();
    })
    .then(data => {
      if(data.user.account_status === "active" || data.user.role === "Merchant"){
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
      }
      else{
        alert("Account inactive, contact your supervisor")
      }
    })
    .catch(error => {
          console.error(error);
          console.log(error.message);
        })
    
    
    
   
  }
  
  function uploadFiles(files){
    const formData = new FormData()
    formData.append("file",files[0])
    formData.append("upload_preset","royalty")

    fetch("https://api.cloudinary.com/v1_1/dkwu8nd4d/image/upload", {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error))

  }




  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
      </div>
      <div className="right">
        <h2>Login as {role}</h2>
        <form onSubmit={handleLogin}>
         
          <div className="input-group">
          <input type='file' onChange={(event)=>uploadFiles(event.target.files)}/>
            <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange}/>
          </div>
          <div className="forgot-password">
            <button>Forgot password?</button>
          </div>
          <p>{error}</p>
          <button className='button_login' type="submit" >LOG IN</button>
          <p onClick={()=>navigate("/")} style={{cursor:"pointer"}}>Back to Home Page</p>
          
        
        </form>
      </div>
    </div>
  );
};

export default Login;
