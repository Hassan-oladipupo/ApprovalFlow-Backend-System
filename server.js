const express = require('express');
const dotEnv = require('dotenv');
const dbConnection = require('./src/Database/connection');
const morgan = require('morgan');
const cors = require('cors');

dotEnv.config();

const app = express();

app.use(cors());
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));


// app.use('/products', require('./api/routes/productRoute'));
// app.use('/orders', require('./api/routes/orderRoute'));
// app.use('/users', require('./api/routes/userRoute'));
// app.use('/carts', require('./api/routes/cartRoute'));
// app.use('/product-review', require('./api/routes/productReviewRoute'));
// app.use('/delivery-fee', require('./api/routes/deliveryFeeRoute'));
// app.use('/user-profile', require('./api/routes/userProfileRoute'));
// app.use('/payment', require('./api/routes/paymentServiceRoute'));
// app.use('/wish-list', require('./api/routes/userWhistListRoute'));


app.get('/', (req, res) => {
  res.send('send, receive and manage approval request within an organization.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
    body: {}
  });
});