import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registration.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const history = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://container-one-service-ydbeaqyadq-nn.a.run.app/register', {
        name,
        password,
        email,
        location,
      });
      if (response.data.status === "success") {
        setRegistrationMessage('Registration successful');
        history('/login');
      } else {
        setRegistrationMessage('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2 style={{'text-align':'center'}}>Registration</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>{registrationMessage}</p>
      </form>
    </div>
  );
};

export default Registration;
