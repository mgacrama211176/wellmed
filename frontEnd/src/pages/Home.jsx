import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import '../styles/home.css';

//MUI components
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//Toast components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//icons
import facebook from '../assets/icons/facebook.png';
import map from '../assets/icons/map.png';

const Home = () => {
  //States
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState({ search: '' });
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const [resultProducts, setResultProducts] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = useNavigate();

  const url = 'http://localhost:4000/login';
  const searchURL = 'http://localhost:4000/search/';

  const notify = () =>
    toast.error('Incorrect Username or Password', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //Auto then Redirect to a new page.,
  const authAcountAndRedirect = (e) => {
    e.preventDefault(e);
    axios
      .post(url, {
        username: login.username,
        password: login.password,
      })
      //I need to check if the username and password is correct.
      //if correct it will pop up that the password is correct then direct to the console page.
      //else it will pop up an error that there is wront with the input.

      .then((response) => {
        console.log(response);
        sessionStorage.setItem('admin', JSON.stringify(login.username));
        nav('/console');
      })
      .catch((err) => {
        setLogin({ username: '', password: '' });
        notify();
      });
  };

  //LOGIN ON CHANGE
  const onChangeHandle = (e) => {
    const userInput = { ...login };
    userInput[e.target.id] = e.target.value;
    setLogin(userInput);
    console.log(userInput);
  };

  //SearchBAR OnChangeHandle
  const searchBarChange = (e) => {
    const searchInput = { ...search };
    searchInput[e.target.id] = e.target.value;
    setSearch(searchInput);
    console.log(searchInput);
  };

  // Search OnClick
  const getProduct = async () => {
    const searchedProduct = searchURL + search.search;

    try {
      const result = await axios.get(searchedProduct);
      console.log(result.data.message);
      setResultProducts(result.data.message);
    } catch (err) {
      console.log(err);
    }

    console.log(searchedProduct);
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
      {/* SEARCH BOX PART */}
      <div className="mainContainer">
        <img src={Logo} alt="logo" />
      </div>
      <div className="searchBar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Product"
          onChange={(e) => searchBarChange(e)}
          value={search.search}
        />
        <button onClick={getProduct}>Search</button>
      </div>
      <div className="tableContainer">
        <table className="searchProductContainer">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>BRAND</th>
              <th>UNIT</th>
              <th>PRICE</th>
            </tr>
          </thead>
          {resultProducts.map((result) => (
            <tr key={result._id}>
              <td>{result.product}</td>
              <td>{result.brand}</td>
              <td>{result.unit}</td>
              <td>{result.price}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="login">
        <Button onClick={handleOpen}>Login</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={(e) => authAcountAndRedirect(e)}>
            <div className="inputContainer">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={(e) => onChangeHandle(e)}
                value={login.username}
                required
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={(e) => onChangeHandle(e)}
                value={login.password}
                required
              />
              <button type="submit" id="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>

      <div className="linkIcons">
        <li>
          <a href="https://www.facebook.com/Well-Med-Drugstore-101510945909948">
            <img src={facebook} alt="logo" />
          </a>
        </li>
        <li>
          <a href="https://www.google.com/maps/place/Fashion+M+%26+M+Acre/@10.5205165,124.023709,66m/data=!3m1!1e3!4m13!1m7!3m6!1s0x33a9b0815de34d3f:0xd546709e03f8ad12!2sDanao+City,+Cebu!3b1!8m2!3d10.5417498!4d123.9527031!3m4!1s0x33a9b0868cd40387:0xd20e2a2fb93677fb!8m2!3d10.5206202!4d124.0237815">
            <img src={map} alt="logo" />
          </a>
        </li>
      </div>
    </div>
  );
};

export default Home;
