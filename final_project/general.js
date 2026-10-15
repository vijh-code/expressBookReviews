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

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${baseUrl}/isbn/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.error("Could not retrieve that book:", error.message);
  }
}
getBookByISBN("1");