const axios = require("axios");

const baseUrl = "http://localhost:5000";

async function getAllBooks() {
  try {
    const response = await axios.get(`${baseUrl}/`);
    console.log(response.data);
  } catch (error) {
    console.error("Could not retrieve books:", error.message);
  }
}

getAllBooks();