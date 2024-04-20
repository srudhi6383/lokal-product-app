$(document).ready(function() {
  const productId = getUrlParameter('id');
  if (productId) {
      fetchProduct(productId);
  } else {
      showError();
  }
});

function fetchProduct(productId) {
  $.getJSON("db.json", function(data) {
      const product = data.products.find(p => p.id == productId);
      if (product) {
          displayProduct(product);
      } else {
          showError();
      }
  });
}

function displayProduct(product) {
  $("#productName").text(product.name);
  $("#productThumbnail").attr("src", product.thumbnail);
  $("#productDescription").text(product.description);
  const additionalImages = $("#additionalImages");
  additionalImages.html('');
  product.images.forEach(image => {
      if (image) {
          additionalImages.append(`<img src="${image}" alt="${product.name}" class="w-full h-auto">`);
      }
  });
}

function showError() {
  $("#productDetail").html('<p class="text-red-500">Product not found.</p>');
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}