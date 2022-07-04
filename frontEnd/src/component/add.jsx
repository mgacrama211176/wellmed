import React, { useState } from 'react';
import '../styles/console.css';
import axios from 'axios';

//other components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const add = () => {
  const [products, SetProducts] = useState({
    ProductName: '',
    BrandName: '',
    Unit: '',
    Price: '',
  });
  const productUrl = 'http://localhost:4000/newProduct';

  const notify = () =>
    toast.success(`Added: ${products.ProductName}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeHandle = (e) => {
    const newProducts = { ...products };
    newProducts[e.target.id] = e.target.value;
    SetProducts(newProducts);
    console.log(newProducts);
  };

  const onClickAddSubmit = async (e) => {
    await axios.post(productUrl, {
      product: products.ProductName,
      brand: products.BrandName,
      unit: products.Unit,
      price: parseFloat(products.Price),
    });

    notify();
    preventDefault(e);
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
      <div className="optionContainer">
        <h1>Add Items</h1>
        <form>
          <label htmlFor="Product">Product Name</label>
          <input
            type="text"
            id="ProductName"
            onChange={(e) => onChangeHandle(e)}
            value={SetProducts.ProductName}
            required
          />
          <label htmlFor="Product">Brand Name</label>
          <input
            type="text"
            id="BrandName"
            onChange={(e) => onChangeHandle(e)}
            value={SetProducts.BrandName}
            required
          />
          <label htmlFor="Product">Unit</label>
          <select
            name="Unit"
            id="Unit"
            onChange={(e) => onChangeHandle(e)}
            value={SetProducts.Unit}
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
            onChange={(e) => onChangeHandle(e)}
            value={SetProducts.Price}
            required
          />
          <button onClick={onClickAddSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default add;
