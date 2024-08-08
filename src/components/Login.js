import React, { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user"
  console.log(role);
  
  

  const [formData,setFormData] = useState({email:"",full_name:"",password:""})

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch("https://my-duka-back-end.vercel.app/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData,role:role})
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




  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" name='full_name' value={formData.full_name} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange}/>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button className='button_login' type="submit" >LOG IN</button>
          <div className="signup-link">
            <button className='button_signup'  onClick={()=>navigate("/signup")}>Sign Up</button>
          </div>
          <div className="or">OR</div>
          <div className="social-login">
            <button className='button_login' type="button">Continue With Google</button>
            <button className='button_login' type="button">Continue With Facebook</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
