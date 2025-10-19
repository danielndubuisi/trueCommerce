import {
  getLocalStorage,
  setLocalStorage,
  productIsInArray,
  findProductIndexInArrayById,
  capitalizeFirstLetter,
  showAddedToCartMessage, // 👈 import new function
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const productId = this.product.id;

    if (cartItems.length !== 0 && productIsInArray(productId, cartItems)) {
      const itemIndex = findProductIndexInArrayById(productId, cartItems);
      cartItems[itemIndex].quantity++;
      setLocalStorage("so-cart", cartItems);
    } else {
      this.product.quantity = 1;
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
    }

    // ✅ Show alert message after product is added
    showAddedToCartMessage(this.product.title);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector(".breadcrumb").innerHTML =
    `<a href='/product_listing/index.html'>All Products</a> &gt; <span>${capitalizeFirstLetter(product?.category) || "Category"}</span>`;

  // Product name and short description
  document.getElementById("productName").textContent = product?.title;
  document.getElementById("productShortDesc").textContent =
    capitalizeFirstLetter(product?.description) || "Short product description";

  // Product image and thumbnails
  const productImage = document.getElementById("productImage");
  productImage.src = product?.image;
  productImage.alt = product?.title;

  // Pricing
  document.getElementById("productPrice").textContent = `$${product?.price}`;
  const discountPercent = 0.25;
  const finalPrice =
    product?.price && discountPercent
      ? Math.round((1 - discountPercent) * product?.price)
      : 0;
  document.getElementById("productFinalPrice").textContent = `$${finalPrice}`;
  document.getElementById("productDiscount").textContent = discountPercent
    ? `-${discountPercent * 100}%`
    : "";

  // Rating
  document.querySelector(".stars").textContent = "★★★★★"; // Replace with dynamic rating if available
  document.querySelector(".review-count").textContent =
    `(${product?.rating.count || 0})`;

  // Add to Cart button
  document.getElementById("addToCart").dataset.id = product?.id;
}
