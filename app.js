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

app.get('/displayproduct', function(req, res) {
  res.sendFile(__dirname + '/displayproduct.php');
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
  
    // Your code to remove the product based on the name goes here
    // ...
  
    // Send a response back to the client
    res.send(`Product "${productName}" has been removed`);
    
  });
// handle POST requests to update a product
app.post('/update-product', (req, res) => {
    const productName = req.body['update-product'];
    const newProductName = req.body['new-product-name'];
    const newProductPrice = req.body['new-product-price'];
    
    // TODO: perform update operation in database
  
    // redirect back to main page
    res.redirect('/');
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
