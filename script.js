$(document).ready(function() {
  // Load products on page load
  loadProducts();

  // Search input event listener
  $("#searchInput").on('input', function() {
      loadProducts();
  });

  // Category filter event listener
  $("#categoryFilter").on('change', function() {
      loadProducts();
  });

  // Sorting select event listener
  $("#sortSelect").on('change', function() {
      loadProducts();
  });
});

// Function to load products based on search, category, and sorting
function loadProducts() {
  const searchInput = $("#searchInput").val().trim().toLowerCase();
  const categoryFilter = $("#categoryFilter").val();
  const sortOption = $("#sortSelect").val();

  $.getJSON("db.json", function(data) {
      let filteredProducts = data.products;

      // Filter by search input
      if (searchInput !== '') {
          filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchInput));
      }

      // Filter by category
      if (categoryFilter !== '') {
          filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
      }

      // Sort products
      if (sortOption === 'asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      // Display filtered and sorted products
      displayProducts(filteredProducts);
  });
}

// Function to display products on the page
function displayProducts(products) {
  const productList = $("#productList");
  productList.html('');

  products.forEach(product => {
      let description = product.description.substring(0, 15) + "...";

      let card = `
      <div class="bg-white rounded-lg overflow-hidden shadow-lg">
          <img src="${product.thumbnail}" alt="${product.name}" class="w-full h-56 object-cover">
          <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
              <p class="text-gray-600">${description}</p>
              <p class="text-gray-800 mt-2">$${product.price.toFixed(2)}</p>
              <a href="product_detail.html?id=${product.id}" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded inline-block">View Details</a>
          </div>
      </div>
      `;
      productList.append(card);
  });
}