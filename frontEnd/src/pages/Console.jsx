import React from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/console.css';

const Console = () => {
  return (
    <div>
      <div className="consoleContainer">
        <div className="imgContainer">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Console;
