import express from 'express';
import newProducts from '../models/ProductsModel.js';
const router = express.Router();

/* Adding of products */
router.post('/', async (request, response) => {
  const product = request.body.product;
  const brand = request.body.brand;
  const unit = request.body.unit;
  const price = request.body.price;

  const productInformation = new newProducts({
    product: product,
    brand: brand,
    unit: unit,
    price: price,
  });
  await productInformation.save();
  response.status(200).json({ message: `Product ${product} has been added` });
});

export default router;
