const express = require('express');
var router = express.Router();
let books = require('../books/books.js')
let users = [{"email":"aamir@gmail.com","password":"aamir123"},{"hamza":"hamza@gmail.com","password":"hamza123"}];


router.post("/register", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
  
  
    if (email && password) {
        const validemail=users.filter((user)=>{
            return user.email=email 
        })
      if (!validemail) {
        users.push({"email":email,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "User Already Exists."});
  });

// Endpoint for getting the List of the Books Available in the Shop
router.get('/', function (req, res) {
    //Write your code here
    return res.status(200).send(JSON.stringify(books));
});

// Endpoint for getting book detail by ISBN 
router.get('/bookDetailByisbn/:ISBN', function (req, res) {
    const ISBN = req.params.ISBN;
    return res.status(200).send(books[ISBN]);
});

// Endpoint for getting book by author name
router.get('/bookDetailByAuthor/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;
    const authorbook = books.filter((book) => {
        return book.author == author
    })
    if (authorbook)
        return res.status(200).send(authorbook)
    else
        return res.status(404).json({ message: "Author Not found" });
});

// Endpoint for getting book by book title
router.get('/bookByTitle/:title', function (req, res) {
    //Write your code here
    const title = req.params.title;
    const bookTitle = books.filter((book) => {
        return book.title == title
    })
    if (bookTitle)
        return res.status(200).send(bookTitle)
    else
        return res.status(404).json({ message: "Book Title Not Found" });
});

// Endpoint for Reviews for a specific book
router.get('/review/:ISBN', function (req, res) {
    //Write your code here
    const isbn = req.params.ISBN;
    const bookISBN = books.filter((book) => {
        return book.ISBN == isbn
    })
    if (bookISBN)
        return res.status(200).send(bookISBN.reviews)
    else
        return res.status(404).json({ message: "ISBN Not found" });

});


function promiseForAllBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    })
}

// Endpoint for getting the List of the Books Available in the Shop Using Promise
router.get('/', function async(req, res) {
    promiseForAllBooks().then(
        (getAllBooks) => res.send(JSON.stringify(getAllBooks))
    ).catch(err)
    console.log(err)
});

function promiseForISBN(isbn) {

    const book = books.filter((isbn) => {
        return books.ISBN == isbn
    })
    return new Promise((resolve, reject) => {
        if (book) {
            resolve(book);
        } else {
            reject("ISBN not Found");
        }
    })
}

// Endpoint for getting book detail by ISBN using promise
router.get('/bookDetailByisbn/:ISBN', function async(req, res) {
    const isbn = req.params.ISBN;

    promiseForISBN(isbn).then(
        (book) => res.send(JSON.stringify(book))
    ).catch(err)
    console.log(err)
});


function promiseForAuthor(author) {
    const author_ = books.filter((author) => {
        return books.author == author
    })
    return new Promise((resolve, reject) => {
        if (author_)
            resolve(output);
        else
            reject("Author not Found")
    })
}

// Endpoint for getting book detail by Author using promise
router.get('bookDetailByAuthor/:author', function (req, res) {
    const author = req.params.author;
    promiseForAuthor(author)
        .then(
            output => res.send(JSON.stringify(output))
        ).catch(err)
    console.log(err)
});

function promiseForTitle(title) {
    const allBooks = books.filter((title) => {
        return books.title == title
    })
    return new Promise((resolve, reject) => {
        if (allBooks)
            resolve(output);
        else
            reject("Titler not Found")
    })
}

// Endpoint for getting book detail by Title using promise
router.get('/bookByTitle/:title', function (req, res) {
    const title = req.params.title;
    promiseForTitle(title)
        .then(
            output => res.send(JSON.stringify(output))
        ).catch(err)
        console.log(err)
});

module.exports=router