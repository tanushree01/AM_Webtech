import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from './users.json';
import './index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = userData.find((user) => user.username === username && user.password === password);

    if (user) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
