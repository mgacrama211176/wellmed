import mongoose from 'mongoose';

const administrator = new mongoose.Schema({
  username: String,
  password: String,
  confirmPassword: String,
});

const adminModel = mongoose.model('administrator', administrator);

export default adminModel;
