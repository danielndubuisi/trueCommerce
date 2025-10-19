const storeURL = import.meta.env.FAKESTORE_API_URL;

function convertToJson(res) {
    console.log(res);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

// this class handles all external service calls
export default class ExternalServices {
    constructor() {}

    // gets all the store data and only category data if specified
    async getData(category) {
        const response = await fetch(`${storeURL}`);
        const data = await convertToJson(response);
        if (category) {
            const catData = data.filter(data.category == category)
            return catData;
        } else {
            return data.Result;
        }
    }
    // find a specific item
    async findProductById(id) {
        const response = await fetch(`${storeURL}/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }

    // checkout function
    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        console.log(options);
        return await fetch(`${storeURL}checkout/`, options).then(convertToJson);
    }
}
