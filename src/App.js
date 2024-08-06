import React from 'react';


import Signup from './components/Signup'; // Ensure the path is correct

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/Login';

import './App.css';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
};

export default App;


