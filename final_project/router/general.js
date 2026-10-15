const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

if (!username || !password) {
  return res.status(400).json({ message: "Username and password are required" });
}

if (isValid(username)) {
  return res.status(409).json({ message: "User already exists" });
}

users.push({ username, password });

return res.status(201).json({
  message: "User successfully registered. Now you can login"
});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.type("json").send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.type("json").send(JSON.stringify(books[isbn], null, 2));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const matches = Object.values(books).filter(book =>
    book.author.toLowerCase() === author.toLowerCase()
);
res.type("json").send(JSON.stringify(matches, null, 2))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const matches = Object.values(books).filter(book =>
    book.title.toLowerCase() === title.toLowerCase()
);

res.type("json").send(JSON.stringify(matches, null, 2));
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
const book = books[isbn];

if (!book || Object.keys(book.reviews).length === 0) {
  return res.status(404).json({ message: "No reviews found for this book." });
}
res.type("json").send(JSON.stringify(book.reviews, null, 2));
});

module.exports.general = public_users;
