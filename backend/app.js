import express, { response } from 'express';
import path from 'path';

import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

import usersRouter from './routes/users.js';

import bodyParser from 'body-parser';

//Models
import adminModel from './models/AdminAccount.js';
import newProducts from './models/ProductsModel.js';

//connecting to DB
import connectdb from './connectdb.js';
connectdb('mongodb://localhost:27017/', 'WellMed');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.post('/auth/admin', (request, response) => {
  const username = request.body.username;
});

app.post('/registerAdmin', async (request, response) => {
  //manually adding admin on mongo
  const username = request.body.username;
  const password = request.body.password;
  const administrator = new adminModel({
    username: username,
    password: password,
  });
  await administrator.save();
  response.status(201).json({ message: 'Admin Created' });
});

//Adding new products
app.post('/newProduct', async (request, response) => {
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

// app.use(function (req, res, next) {
//   res.status(404).json({message: "We couldn't find what you were looking for 😞"})
// })

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
