const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// create an instance of the express application
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// Configure body parser middleware

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CIS475finalproject',
  });

// connect to the database
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get('/display-products', function(req, res) {
  // Fetch the data from the database
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;

    // Pass the data to the products.ejs view
    res.render('products', { products: results });
  });
});


app.post('/display-products', function(req, res) {
  const name = req.body.name;
  const query = "SELECT * FROM products WHERE name = ?";
  connection.query(query, [name], function(err, rows, fields) {
    if (err) throw err;
    res.render('products', { products: rows });
  });
});



// handle POST requests to add a product
app.post('/add-product', function(req, res) {
  const productName = req.body.product_name;
  const productPrice = req.body.product_price;
  const sql = `INSERT INTO products (name, price) VALUES ('${productName}', '${productPrice}')`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('Product added to the database!');
    res.redirect('/');
  });
});
  
app.post('/remove-product', (req, res) => {
  const productName = req.body.search_product;
  const productId = req.body.search_id;

  let sql = '';
  let queryParams = [];

  if (productName) {
    sql = 'DELETE FROM products WHERE Name = ?';
    queryParams = [productName];
  } else if (productId) {
    sql = 'DELETE FROM products WHERE ID = ?';
    queryParams = [productId];
  } else {
    res.status(400).send('Bad request');
    return;
  }

  // Execute the SQL query to delete the product
  connection.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    // Send a response back to the client
    let message = '';
    if (productName) {
      message = `Product "${productName}" has been removed`;
    } else if (productId) {
      message = `Product with ID "${productId}" has been removed`;
    }
    res.send(message);
  });
});

// handle POST requests to update a product
app.post('/update-product', (req, res) => {
  const productName = req.body['update-product'];
  const newProductName = req.body['new-product-name'];
  const newProductPrice = req.body['new-product-price'];
  
  // Perform update operation in database
  const query = 'UPDATE products SET name = ?, price = ? WHERE name = ?';
  connection.query(query, [newProductName, newProductPrice, productName], (err, result) => {
    if (err) throw err;
    console.log('Product has been updated');
    // redirect back to main page
    res.redirect('/');
  });
});



app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
// start the server
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
