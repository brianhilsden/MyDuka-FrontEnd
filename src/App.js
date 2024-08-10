import React from 'react';
import { useEffect } from 'react';

import ClerksPage from './components/ClerksPage';

import { useDispatch } from 'react-redux';
import { addUser } from './features/userSlice';

import Signup from './components/Signup'; // Ensure the path is correct

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MerchantDashboard from './components/MerchantDashboard/MerchantDashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';

import './App.css';
import AdminPage from './components/AdminPage';



const App = () => {
  const dispatch = useDispatch()
 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetch('https://my-duka-back-end.vercel.app/check_session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to verify token');
        }
        return response.json(); // Parse JSON response
      })
      .then(userData => {
        console.log(userData);
        
        dispatch(addUser(userData)); // Set user data once fetched
      })
      .catch(error => {
        console.error('Token verification failed:', error);
       
      });
    }
  }, [dispatch]);

  
  return (


    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/clerk/:id" element={<ClerksPage/>}/>
        <Route path='/merchant' element={<MerchantDashboard/>}/>
        <Route path='/admin/:id' element={<AdminPage/>}/>
      </Routes>
    </Router>


  );
};

export default App;

