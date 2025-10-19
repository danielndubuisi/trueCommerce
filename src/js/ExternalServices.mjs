const baseURL = import.meta.env.VITE_FAKESTORE_API_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}products/`);
    const data = await convertToJson(response);
    if (category) {
      return data.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      );
    }

    return data;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}products/${id}`);
    const data = await convertToJson(response);
    return data;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    console.log(options);
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
