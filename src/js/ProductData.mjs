function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad response: ${res.status} ${res.statusText}`);
  }
}

// Base URL for server - can be changed in the .env file
const baseURL = import.meta.env.VITE_FAKESTORE_API_URL; //from .env file

// Class to handle fetching product data
export default class ProductData {
  constructor(category) {
    this.category = category;
    // Always served from /json/... because it's inside public/
    this.path = `${baseURL}products`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      const data = await convertToJson(response);
      return data;
    } catch (err) {
      console.error("Error loading data:", err);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => String(item.id) === String(id));
  }
}
