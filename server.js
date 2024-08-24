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



app.use('/user', require('./src/routes/userRoute'));
app.use('/request', require('./src/routes/approvalRequestRoutes'));


app.get('/', (req, res) => {
  res.send('Send, receive and manage approval request within an organization.');
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