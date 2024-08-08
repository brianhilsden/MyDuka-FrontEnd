import React from 'react';


import { Link } from 'react-router-dom';

const Navigation = () => {


  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">My Duka</Link></li>
        <li><Link to="/request-products">Request Products</Link></li>
        <li><Link to="/sell-item">Sell Item</Link></li>
        <li><button onClick={handleLogout}>Log Out</button></li>
      </ul>
    </nav>
  );
};

export default Navigation;
