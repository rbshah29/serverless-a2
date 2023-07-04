import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://container-two-service-ydbeaqyadq-nn.a.run.app/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        setLoginMessage('Login successful');

        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('email', email);
        history('/dashboard');
      } else {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h2 style={{'text-align':'center'}}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>{loginMessage}</p>
      </form>
    </div>
  );
};

export default Login;
