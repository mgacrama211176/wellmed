import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import '../styles/home.css';

//MUI components
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//other components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = useNavigate();
  const url = 'http://localhost:4000/login';

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const notify = () =>
    toast.success(`Welcome ${login.username}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //Auto then Redirect to a new page.,
  const authAcountAndRedirect = async (e) => {
    e.preventDefault(e);
    setLogin('');
    await axios
      .post(url, {
        username: login.username,
        password: login.password,
      })
      //I need to check if the username and password is correct.
      //if correct it will pop up that the password is correct then direct to the console page.
      //else it will pop up an error that there is wront with the input.

      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          notify();
        } else {
          console.log(`DIE BITCH`);
        }
        // sessionStorage.setItem(
        //   'admin',
        //   JSON.stringify(login.username, login.password)
        // );
        // nav('/console');
        // console.log(response.data);
      });
  };

  const onChangeHandle = (e) => {
    const userInput = { ...login };
    userInput[e.target.id] = e.target.value;
    setLogin(userInput);
    console.log(userInput);
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
      <ToastContainer />
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
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={(e) => onChangeHandle(e)}
                value={setLogin.username}
                required
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={(e) => onChangeHandle(e)}
                value={setLogin.password}
                required
              />
              <input
                type="submit"
                id="submit"
                onClick={(e) => authAcountAndRedirect(e)}
              />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
