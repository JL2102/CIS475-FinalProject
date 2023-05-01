$(document).ready(function() {
    $("#display-button").click(function() {
      $.ajax({
        url: "/displayproduct",
        type: "GET",
        dataType: "html",
        success: function(data) {
          $("#product-table").html(data);
        },
        error: function(xhr, status, error) {
          console.error("AJAX error: " + status + " - " + error);
        }
      });
    });
  });
