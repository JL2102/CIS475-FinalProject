document.getElementById("display-button").addEventListener("click", function() {
  // Make AJAX call
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          // Update table with response data
          document.getElementById("product-table").innerHTML = this.responseText;
      }
  };
  xhttp.open("GET", "displayproduct.php", true);
  xhttp.send();
});