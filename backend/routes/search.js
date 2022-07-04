import express from 'express';
import newProducts from '../models/ProductsModel.js';
const router = express.Router();

//ROUTER http://localhost:4000/newProduct/search
router.get('/', async (request, response) => {
  const product = request.query.product;
  //   const brand = request.body.brand;
  //find where products appear that came from the newProducts model
  const findProduct = await newProducts.find({
    // aggregation
    $or: [{ product: { $regex: product, $options: 'i' } }],
    // $or: [{ brand: { $regex: brand, $options: 'i' } }],
  });
  response.status(200).json({ message: findProduct });
  console.log(findProduct);
});

export default router;
