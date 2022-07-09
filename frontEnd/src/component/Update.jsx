import React, { useState, useEffect } from "react";
import "../styles/update.css";
import axios from "axios";

//other components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Search Product", "Select Product", "Make Changes"];
let StepCounter = 0;

const Update = () => {
  const notify = () => {
    toast.success(`Updated: ${products.ProductName}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  //SEARCHING FOR ID FUNCTIONS
  const [searchID, setSearchID] = useState({ searchID: "" });

  const OnChangeSearchInput = (e) => {
    const newSearch = { ...searchID };
    newSearch[e.target.id] = e.target.value;
    setSearchID(newSearch);
    console.log(newSearch);
  };

  const [result, setResult] = useState([]);
  const OnclickSearch = async () => {
    const productUrl = "http://localhost:4000/search/";
    const SearchItem = productUrl + searchID.searchID;
    console.log(SearchItem);
    try {
      const result = await axios.get(SearchItem);
      console.log(result.data.message);
      setResult(result.data.message);
      StepCounter = 1;
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(productSearch);

  // const Onsearch = async (e) => {
  //   e.preventDefault();
  //   await axios.post(productUrl, {
  //     product: products.ProductName,
  //     brand: products.BrandName,
  //     unit: products.Unit,
  //     price: parseFloat(products.Price),
  //   });
  // };

  //when selected
  const [selectedProduct, setSelectedProduct] = useState("");

  const OnClickOnSelected = async () => {
    const updateURL = "http://localhost:4000/product/update/";
    const combinedUpdateURL = updateURL + selectedProduct;
    console.log(combinedUpdateURL);
    StepCounter = 2;
  };

  useEffect(() => {
    OnClickOnSelected();
  }, [selectedProduct]);

  // Search OnClick
  // const getProduct = async () => {
  //   const searchedProduct = searchURL + search.search;

  //   try {
  //     const result = await axios.get(searchedProduct);
  //     console.log(result.data.message);
  //     setResultProducts(result.data.message);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log(searchedProduct);
  // };

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
        <h1>Search Item to Update</h1>
        <Box sx={{ width: "100%" }}>
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

          <div className="tableContainer">
            <table className="searchProductContainer">
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
                  <button
                    onClick={(e) => {
                      setSelectedProduct(result._id);
                    }}
                  >
                    Update
                  </button>
                </tr>
              ))}
            </table>
          </div>

          {/* {result.map((result) => (
            <tbody key={result._id}>
              <tr>
                <td>{result.product}</td>
              </tr>
            </tbody>
          ))} */}
        </div>
        {/* <form>
          <label htmlFor="Product">Product Name</label>
          <input type="text" id="ProductName" required />
          <label htmlFor="Product">Brand Name</label>
          <input type="text" id="BrandName" />
          <label htmlFor="Product">Unit</label>
          <select name="Unit" id="Unit" required>
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
          <input type="text" id="Price" required />
          <button>Submit</button>
        </form> */}
      </div>
    </div>
  );
};

export default Update;
