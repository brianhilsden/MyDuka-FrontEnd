// ForgotPasswordPopup.js
import React, { useState } from 'react';

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [role,setRole] = useState('')
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://my-duka-back-end.vercel.app/api/reset_password_request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,role }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Reset Your Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Merchant">Merchant</option>
              <option value="Clerk">Clerk</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="button_login">Send Reset Link</button>
          <p>{message}</p>
        </form>
        <button className="button_close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
