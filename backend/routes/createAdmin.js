import express from 'express';
import adminModel from '../models/AdminAccount.js';
import bcrypt from 'bcrypt';
const router = express.Router();

/* GET users listing. */
router.post('/', async (request, response) => {
  //manually adding admin on mongo
  const hashPassword = await bcrypt.hash(request.body.password, 10);

  const username = request.body.username;
  const password = hashPassword;

  const administrator = new adminModel({
    username: username,
    password: password,
  });
  await administrator.save();
  response.status(201).json({ message: 'Admin Created' });
});

export default router;
