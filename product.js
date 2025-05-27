let allProducts = JSON.parse(localStorage.getItem("Product_Image")) || [];
console.log("product.js: Loaded allProducts from localStorage:", allProducts);
// Function to extract id from URL
function getIdFromUrl() {
  console.log("getIdFromUrl: Attempting to retrieve product ID from URL.");
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("Id");
}

// Function to filter products by id
function filterProductsById(Id) {
  console.log("filterProductsById: Filtering products for ID:", Id);
  return allProducts.filter(
    (product) => product.Id === parseInt(Id)
    // console.log(product.Id === Id)
  );
}

// Function to display products on the page
function displayProducts(products) {
  console.log("displayProducts: Displaying product details for:", products);
  const productList = $(".main-image");
  const thumbnails = $(".thumbnails");
  const product_name = $(".product-name");
  const price = $(".price");
  // Clear existing content
  productList.empty();
  thumbnails.empty();
  product_name.empty();
  price.empty();
  //   console.log(products);
  // Display each product
  products.forEach((product) => {
    productList.append(
      `
      <img src="${product.Images[0]}"   >
        `
    );
    product.Images.forEach((i) => {
      thumbnails.append(`
        <img src="${i}" class="thumbnails-img" onclick="showImage('${i}')">`);
    });

    price.append(`$ ${product.Price}`);

    product_name.append(`${product.Description}`);
  });
}

// Get id from the URL
const idFromUrl = getIdFromUrl();
console.log("getIdFromUrl: ID from URL:", idFromUrl);

if (idFromUrl) {
  // Filter products by id
  const filteredProducts = filterProductsById(idFromUrl);
  //   console.log("Yes");
  console.log("product.js: Filtered product:", filteredProducts);

  // Display filtered products
  displayProducts(filteredProducts);
} else {
  // Display all products if no id is specified
  console.log("product.js: No ID in URL, attempting to display all products (or handle as error/default).");
  displayProducts(allProducts);
}
function showImage(imageSrc) {
  console.log("showImage: Function called to display image.");
  console.log("showImage: New image source:", imageSrc);

  document
    .getElementsByClassName("main-image")[0]
    .getElementsByTagName("img")[0].src = imageSrc;
}
