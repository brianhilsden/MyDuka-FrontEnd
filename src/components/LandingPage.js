import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import myImage from '../assets/images/e242a5362a5b0f6dae0b5b3fdbafe721.jpg'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (role) => {
    navigate(`/login`, { state: { role } });
  };

  return (
    <div className="landing-page">
      <div className="left-panel">
        <h1>Welcome to MyDuka</h1>
        <img src={myImage} style={{width:"100%"}} alt="Background" />
      </div>
      <div className="right-panel">
        <h2>Continue As</h2>
        <button className='button_login' onClick={() => handleNavigate('Merchant')}>Merchant</button>
        <button className='button_login' onClick={() => handleNavigate('Admin')}>Admin</button>
        <button className='button_login' onClick={() => handleNavigate('Clerk')}>Clerk</button>
      </div>
    </div>
  );
};

export default LandingPage;

