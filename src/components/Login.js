import React, { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import myImage from '../assets/images/b916ee86f6025021330e27de0684542c.jpg';



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
  



  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
        <img src={myImage} style={{width:"100%"}} alt="Background" />
      </div>
      <div className="right">
        <h2>Login as {role}</h2>
        <form onSubmit={handleLogin}>
         
          <div className="input-group">
          
            <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange}/>
          </div>
          <div className="forgot-password">
            <p style={{cursor:"pointer", textDecoration:"none"}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Forgot password?</p>
          </div>
          <p>{error}</p>
          <button className='button_login' type="submit" >LOG IN</button>
          <p onClick={()=>navigate("/")} style={{cursor:"pointer", textDecoration:"none"}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Back to Home Page</p>
          
        
        </form>
      </div>
    </div>
  );
};

export default Login;
