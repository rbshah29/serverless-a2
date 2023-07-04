import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Home Page</h2>
      <ul className="home-links">
        <button className="home-link">
          <Link to="/registration"><h4 className="link-name">Registration</h4></Link>
        </button><br/><br/>
        <button className="home-link">
          <Link to="/login"><h4 className="link-name">Login</h4></Link>
        </button>
      </ul>
    </div>
  );
};

export default Home;
