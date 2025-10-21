import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

const services = new ExternalServices();

function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
    id: item.id,
    price: item.price * item.quantity,
    name: item.title,
    quantity: item.quantity,
  }));
  return simplifiedItems;
}

function formDataToJSON(formData) {
  const data = new FormData(formData);
  const convertedJSON = {};
  data.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    let subtotal = 0;
    let itemCount = 0;
    this.list.forEach((item) => {
      subtotal += item.price * item.quantity;
      itemCount++;
    });
    this.itemTotal = subtotal;
    this.calculateOrderTotal();
    document.querySelector("#cartTotal").textContent =
      `$${subtotal.toFixed(2)}`;
    document.querySelector("#num-items").textContent = `${itemCount}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal =
      parseFloat(this.itemTotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${
      this.orderTotal < 700 ? this.shipping.toFixed(2) : 0.0
    }`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log("Checkout success:", response);

      // clear cart and redirect to success page
      localStorage.removeItem("so-cart");
      window.location.href = "../checkout/success.html";
    } catch (err) {
      alertMessage(
        `Checkout failed: ${
          err.message?.message || JSON.stringify(err.message)
        }`,
        false,
      );
    }
  }
}
