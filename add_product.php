<?php

// Get the product data from the form data
$product_name = $_POST['product_name'];
$product_price = $_POST['product_price'];

// Load the existing product data from the JSON file
$product_data = json_decode(file_get_contents('products.json'), true);

// Add the new product data to the product data array
$new_product = array(
  'name' => $product_name,
  'price' => $product_price
);
$product_data[] = $new_product;

// Save the updated product data to the JSON file
file_put_contents('products.json', json_encode($product_data));

// Redirect back to the index page
header('Location: index.php');
exit;

?>
