import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.jpg';
import '../styles/home.css';

//MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <Button onClick={handleOpen}>Login</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form>
            <div className="inputContainer">
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
              <input type="submit" id="submit" />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
