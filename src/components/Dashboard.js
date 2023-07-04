import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';


const Dashboard = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    

    if (!token) {
      history('/login');
      return;
    }

    fetch('https://container-three-service-ydbeaqyadq-nn.a.run.app/online-users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOnlineUsers(data))
      .catch((error) => {
        console.error('Error:', error);
        history('/login');
      });
  }, [history]);

  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    try {
        await axios.post('https://container-two-service-ydbeaqyadq-nn.a.run.app/logout', {
            email: email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  
    sessionStorage.clear();
    history('/');
  };

  return (
    <div className="dashboard-container">
  <h2 className="dashboard-title">Dashboard</h2>
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
  <div className="online-users-section">
    <h3 className="online-users-title">Online Users:</h3>
    {onlineUsers.length > 0 ? (
      <ul className="online-users-list">
        {onlineUsers.map((user) => (
          <li className="online-users-item" key={user.id}>
            {user.id}
          </li>
        ))}
      </ul>
    ) : (
      <p>No online users</p>
    )}
  </div>
</div>

  );
};

export default Dashboard;
