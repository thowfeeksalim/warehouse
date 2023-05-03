const express = require('express');
const app = express();

// Import the products route
const productsRoute = require('./routes/products');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set up the products route
app.use('/products', productsRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
