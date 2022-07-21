import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/add.css';
import { useNavigate } from 'react-router-dom';

//components
import AddItems from '../component/add';
import Update from '../component/Update';

const Console = () => {
  const [formHidden, setFormHidden] = useState({
    addItems: 'none',
    updateDelete: 'none',
  });

  const getSessionUser = sessionStorage.getItem('admin');
  const nav = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem('admin');
    nav('/');
  };

  useEffect(() => {
    setFormHidden;
    Protected();
  }, [formHidden]);

  console.log(getSessionUser);

  const Protected = () => {
    if (getSessionUser) {
    } else {
      nav('/');
    }
  };
  return (
    <div>
      <div className="consoleContainer">
        <div className="imgContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li
              onClick={function () {
                setFormHidden({
                  addItems: 'block',
                  updateDelete: 'none',
                });
              }}
            >
              Add Items
            </li>
            <li
              onClick={function () {
                setFormHidden({
                  addItems: 'none',
                  updateDelete: 'block',
                });
              }}
            >
              Update and Delete Items
            </li>
            <button onClick={Logout}>LOGOUT</button>
          </ul>
        </div>
      </div>
      {/* COMPONENTS */}
      <div className="displayOptions">
        <div className="add" style={{ display: ` ${formHidden.addItems}` }}>
          <AddItems />
        </div>
        <div
          className="update"
          style={{ display: ` ${formHidden.updateDelete}` }}
        >
          <Update />
        </div>
      </div>
    </div>
  );
};

export default Console;
