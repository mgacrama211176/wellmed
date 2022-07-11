import React, { useEffect } from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/add.css';
import { useNavigate } from 'react-router-dom';

//components
import AddItems from '../component/add';
import Update from '../component/Update';

const Console = () => {
  const getSessionUser = sessionStorage.getItem('admin');
  const nav = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem('admin');
    nav('/');
  };

  return (
    <div>
      <div className="consoleContainer">
        <div className="imgContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li>Add Items</li>
            <li>Update and Delete Items</li>
            <button onClick={Logout}>LOGOUT</button>
          </ul>
        </div>
      </div>
      {/* COMPONENTS */}
      <div className="displayOptions">
        {/* <div className="add">
          <AddItems />
        </div> */}
        <div className="update">
          <Update />
        </div>
      </div>
    </div>
  );
};

export default Console;
