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
          placeholder="Search Medicine..."
        />
        <button>Search</button>
      </div>
      <div className="login">
        <form>
          <h5>LOGIN</h5>
          <input type="text" />
          <input type="text" />
          <input type="submit" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default Home;
