import React from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/home.css';

const Home = () => {
  return (
    <div>
      <div className="mainContainer">
        <img src={Logo} alt="logo" />
      </div>
      <div className="searchBar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search here..."
        />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Home;
