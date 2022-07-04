import React, { useEffect } from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/console.css';
import { useNavigate } from 'react-router-dom';

//other components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import AddItems from '../component/add';

const Console = () => {
  const getSessionUser = sessionStorage.getItem('admin');
  const nav = useNavigate();

  const notify = () =>
    toast.success(`Welcome ${getSessionUser}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const Logout = () => {
    sessionStorage.removeItem('admin');
    nav('/');
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="consoleContainer">
        <div className="imgContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li>Add Items</li>
            <li>Update Items</li>
            <li>Delete Items</li>
            <button onClick={Logout}>LOGOUT</button>
          </ul>
        </div>
      </div>
      {/* COMPONENTS */}
      <div className="displayOptions">
        <div className="add">
          <AddItems />
        </div>
      </div>
    </div>
  );
};

export default Console;
