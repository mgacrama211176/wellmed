import React, { useState, useEffect } from 'react';
import '../styles/update.css';
import axios from 'axios';

//other components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

let StepCounter = 0;

const Update = () => {
  const steps = ['Search Product', 'Select Product', 'Make Changes'];
  const [deleteProduct, setDeleteProduct] = useState('');
  const [formHidden, setFormHidden] = useState({
    tableContainer: 'block',
    UpdateFormContainer: 'none',
  });

  const notify = () => {
    toast.success(`Updated: ${products.ProductName}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const deletenotify = () => {
    toast.success(`Product Deleted`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  //SEARCHING FOR ID FUNCTIONS
  const [searchID, setSearchID] = useState({ searchID: '' });

  const OnChangeSearchInput = (e) => {
    const newSearch = { ...searchID };
    newSearch[e.target.id] = e.target.value;
    setSearchID(newSearch);
    StepCounter = 0;
  };

  const [result, setResult] = useState([]);
  const OnclickSearch = async () => {
    const productUrl = 'http://localhost:4000/search/';
    const SearchItem = productUrl + searchID.searchID;
    try {
      const result = await axios.get(SearchItem);
      setResult(result.data.message);
      StepCounter = 1;
    } catch (err) {
      console.log(err);
    }
  };

  //when selected for UPDATE
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductInformation, setSelectedProductInformation] = useState({
    product: '',
    brand: '',
    unit: '',
    price: '',
  });
  const productURL = 'http://localhost:4000/product/';

  const OnClickOnSelected = async () => {
    const combinedUpdateURL = `${productURL}${selectedProduct}`;

    StepCounter = 2;

    try {
      const fetchedProduct = await axios.get(combinedUpdateURL);

      setSelectedProductInformation({
        product: fetchedProduct.data.message.product,
        brand: fetchedProduct.data.message.brand,
        unit: fetchedProduct.data.message.unit,
        price: fetchedProduct.data.message.price,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [selectedProductInformation]);

  useEffect(() => {
    OnClickOnSelected();
  }, [selectedProduct]);

  const [products, SetProducts] = useState({
    ProductName: '',
    BrandName: '',
    Unit: '',
    Price: '',
  });
  const onChangeHandle = (e) => {
    const newProducts = { ...products };
    newProducts[e.target.id] = e.target.value;
    SetProducts(newProducts);
    console.log(newProducts);
  };

  //For Deleting the Item
  const deleteURL = 'http://localhost:4000/product/delete/';
  const OnClickDelete = async () => {
    const combinedUpdateURL = `${deleteURL}${deleteProduct}`;
    console.log(combinedUpdateURL);

    try {
      const deleteProductSelected = await axios.delete(combinedUpdateURL);
      deletenotify();
      OnclickSearch();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    OnClickDelete();
  }, [deleteProduct]);

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
      <div className="optionContainer">
        <h1>Search Item to Update or Delete</h1>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={StepCounter} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <div className="searchInput">
          <input
            type="search"
            name="searchID"
            id="searchID"
            placeholder="Search Product"
            onChange={(e) => OnChangeSearchInput(e)}
          />
          <button type="submit" onClick={OnclickSearch}>
            Search
          </button>

          <div
            className="tableContainer"
            style={{ display: ` ${formHidden.tableContainer}` }}
          >
            <table className="searchProductContainer">
              <tbody>
                <tr>
                  <th>PRODUCT</th>
                  <th>BRAND</th>
                  <th>UNIT</th>
                  <th>PRICE</th>
                  <th></th>
                </tr>

                {result.map((result) => (
                  <tr key={result._id}>
                    <td>{result.product}</td>
                    <td>{result.brand}</td>
                    <td>{result.unit}</td>
                    <td>{result.price}</td>
                    <td>
                      <button
                        onClick={function () {
                          setSelectedProduct(result._id);
                          setFormHidden({
                            tableContainer: 'none',
                            UpdateFormContainer: 'block',
                          });
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={function () {
                          setDeleteProduct(result._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <h1>NO PRODUCT FOUND</h1> */}
          </div>
        </div>
        <div
          className="formContainer"
          style={{ display: ` ${formHidden.UpdateFormContainer}` }}
        >
          <form>
            <label htmlFor="Product">Product Name</label>
            <input
              type="text"
              id="ProductName"
              value={selectedProductInformation.product}
              onChange={onChangeHandle}
              required
            />
            <label htmlFor="Product">Brand Name</label>
            <input
              type="text"
              id="BrandName"
              value={selectedProductInformation.brand}
              onChange={onChangeHandle}
            />
            <label htmlFor="Product">Unit</label>
            <select
              name="Unit"
              id="Unit"
              value={selectedProductInformation.unit}
              onChange={onChangeHandle}
              required
            >
              <option value=""></option>
              <option defaultValue="Ampule">Ampule</option>
              <option value="Bottle">Bottle</option>
              <option value="Capsule">Capsule</option>
              <option value="Cream">Cream</option>
              <option value="Gel">Gel</option>
              <option value="Inhaler">Inhaler</option>
              <option value="Nebule">Nebule</option>
              <option value="Pack">Pack</option>
              <option value="Pieces">Pieces</option>
              <option value="Piece">Piece</option>
              <option value="Sachet">Sachet</option>
              <option value="Tablet">Tablet</option>
              <option value="Tube">Tube</option>
              <option value="Vial">Vial</option>
            </select>
            <label htmlFor="Product">Price</label>
            <input
              type="text"
              id="Price"
              value={selectedProductInformation.price}
              onChange={onChangeHandle}
              required
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
