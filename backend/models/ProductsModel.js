import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  description: String,
  category: String,
  price: Number,
});

const newProducts = mongoose.model('products', productSchema);

export default newProducts;
