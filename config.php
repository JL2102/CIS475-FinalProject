<?php 
// server to connect to 
$server = "localhost"; 
 
// name of the database 
$database = "CIS475finalproject"; 
 
// mysql username to access the database 
$db_user = "root"; 
 
// mysql password to access the database 
$db_pass = ""; 
 
//connect to mysql server 
$link = mysqli_connect($server, $db_user, $db_pass, $database) or die("Could not connect to Database because ".mysqli_connect_error()); 
?>
