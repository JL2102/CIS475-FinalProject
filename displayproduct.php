<?php
include "config.php";

$showTable = "SELECT * FROM products";
$result = mysqli_query($conn, $showTable) or die("query error");

echo "<table border cellpadding=3>";
echo "<tr>";
echo "<th>ID</th>";
echo "<th>Name</th>";
echo "<th>Price</th>";
echo "</tr>";

while ($info = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$info['ID']."</td>";
    echo "<td>".$info['Name']."</td>";
    echo "<td>".$info['Price']."</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($conn);
?>
