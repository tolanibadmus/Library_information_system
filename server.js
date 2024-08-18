require('dotenv').config();

const router = require('./routes');
const express = require('express');
const app = express();

//connect to database
const connectDB = require('./config');
connectDB();

require('./models/user');
require('./models/book');
require('./models/staff');
require('./models/bookRental');

//port
const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());

app.use('/', router);

app.get('/healthCheck', (req, res) => {
  res.json({
    success: true,
    message: 'OK',
  });
});

app.listen(PORT);
