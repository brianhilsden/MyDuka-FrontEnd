import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [role,setRole] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://my-duka-back-end.vercel.app/api/reset_password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        navigate(`/login`, { state: { role } });  // Redirect to login after successful reset
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ResetPassword;
