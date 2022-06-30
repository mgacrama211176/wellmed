import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/home.css';

const Home = () => {
  const [show, setShow] = useState('none');

  // useEffect(() => {
  //   setShow(show);
  // }, [show]);

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
          <button id="login" onClick={setShow('block')}>
            Login
          </button>
          <div className="inputContainer" style={{ display: `${show}` }}>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <input type="submit" id="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
