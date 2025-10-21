import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
} from "./utils.mjs";

export default class Cart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    this.renderCartContents();
    this.addEventListeners();
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <a href="${import.meta.env.BASE_URL}product_pages/?product=${item.id}" class="cart-card__image">
          <img src="${item.image}" alt="${item.title}" />
        </a>
        <div class="cart-card__info">
          <a href="${import.meta.env.BASE_URL}product_pages/?product=${item.id}">
            <h2 class="card__name">${item.title}</h2>
          </a>
        </div>
        <div class="cart-actions">
          <div class="quantity-control">
            <button class="qty-btn add" data-id="${item.id}">+</button>
            <span class="qty-text">${item.quantity}</span>
            <button class="qty-btn subtract" data-id="${item.id}">-</button>
            <button class="qty-btn remove" data-id="${item.id}">🗑</button>
          </div>
          <p class="cart-card__price">$${(item.price * item.quantity).toFixed(
            2,
          )}</p>
        </div>
      </li>
    `;
  }

  renderCartContents() {
    if (!this.listElement) return;

    const cartItems = getLocalStorage(this.key) || [];
    this.listElement.innerHTML = "";
    document.querySelector(".summary-items").textContent = cartItems.length;

    if (cartItems.length > 0) {
      this.listElement.innerHTML = cartItems
        .map((item) => this.cartItemTemplate(item))
        .join("");
      this.calculateCartTotal(cartItems);
    } else {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      this.calculateCartTotal(null);
    }
  }

  calculateCartTotal(items) {
    const cartFooter = document.querySelector(".cart-footer");
    if (!cartFooter) return;

    if (!items || items.length === 0) {
      cartFooter.classList.add("hide");
      return;
    }

    let total = 0;
    items.forEach((item) => {
      const price = parseFloat(item.price || 0);
      const quantity = item.quantity || 1;
      total += price * quantity;
    });

    const totalAmount = document.querySelector(".cart-total");
    if (totalAmount) {
      totalAmount.textContent = `$${total.toFixed(2)}`;
      cartFooter.classList.remove("hide");
    };
  }

  changeQuantity(change, itemId) {
    let cartItems = getLocalStorage(this.key) || [];
    let itemIndex = getLocalStorageItemIndex(cartItems, "id", itemId);

    if (itemIndex < 0) return;

    switch (change) {
      case "add":
        cartItems[itemIndex].quantity += 1;
        break;
      case "subtract":
        if (cartItems[itemIndex].quantity === 1) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity -= 1;
        }
        break;
    }

    if (cartItems.length === 0) {
      removeLocalStorageKey(this.key);
    } else {
      setLocalStorage(this.key, cartItems);
    }

    this.renderCartContents();
  }

  removeItem(itemId) {
    let cartItems = getLocalStorage(this.key) || [];
    let itemIndex = getLocalStorageItemIndex(cartItems, "id", itemId);

    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
      if (cartItems.length === 0) {
        removeLocalStorageKey(this.key);
      } else {
        setLocalStorage(this.key, cartItems);
      }
    }

    this.renderCartContents();
  }

  addEventListeners() {
    if (!this.listElement) return;

    // if duplicate item clicked, only increment quantity
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("add")) {
        this.changeQuantity("add", e.target.dataset.id);
      }
      if (e.target.classList.contains("subtract")) {
        this.changeQuantity("subtract", e.target.dataset.id);
      }
      if (e.target.classList.contains("remove")) {
        this.removeItem(e.target.dataset.id);
      }
    });
  }
}
