import { capitalizeFirstLetter, renderListWithTemplate } from "./utils.mjs";

// Template for individual product cards
function productCardTemplate(product) {
  const isDiscounted =
    product.price < (product.SuggestedRetailPrice || product.price);

  return `<li class="product-card">
              <a href="/product_pages/?product=${product.id}" class="card-link">
                <div class="card-media">
                  <img src="${product.image}" alt="Image of ${product.title} class="card-image" />
                </div>
                <div class="card-details">
                  <h3 class="card-name">${product.title}</h3>
                  <p class="card-description">${capitalizeFirstLetter(product.description.length > 100 ? product.description.slice(0, 100) + "..." : product.description)}</p>
                  <p class="card-category">${capitalizeFirstLetter(product.category)}</p>
                  <p class="card-price">
                    $${product.price}
                    ${isDiscounted ? `<span class="discount-flag">Discount!</span>` : ""}
                  </p>
                  <button class='btn btn-primary'>View Item</button>
                </div>
              </>
            </li>`;
}
// Main class to handle product listing
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  // Initialize and fetch data
  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      // Update the page title based on the category
      const titleElement = document.querySelector(".title");
      if (titleElement) {
        titleElement.textContent = capitalizeFirstLetter(this.category);
      }
    } catch (err) {
      console.error("Error initializing ProductList:", err);
    }
  }
  // Render the product list using the template
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
