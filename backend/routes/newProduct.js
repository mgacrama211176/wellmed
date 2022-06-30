import express from 'express';
import newProducts from '../models/ProductsModel.js';
const router = express.Router();

/* GET users listing. */
router.post('/', async (request, response) => {
  const description = request.body.description;
  const category = request.body.category;
  const price = request.body.price;
  const productInformation = new newProducts({
    description: description,
    category: category,
    price: price,
  });
  await productInformation.save();
  response
    .status(200)
    .json({ message: `Product ${description} has been added` });
});

export default router;
