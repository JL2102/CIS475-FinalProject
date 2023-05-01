<?php

// Get the product name to remove from the form data
$product_name = $_POST['remove_product'];

// Load the existing product data from the JSON file
$product_data = json_decode(file_get_contents('products.json'), true);

// Remove the selected product from the product data array
foreach ($product_data as $key => $product) {
  if ($product['name'] == $product_name) {
    unset($product_data[$key]);
  }
}

// Re-index the product data array
$product_data = array_values($product_data);

// Save the updated product data to the JSON file
file_put_contents('products.json', json_encode($product_data));

// Redirect back to the index page
header('Location: index.php');
exit;

?>
