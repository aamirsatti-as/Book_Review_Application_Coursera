const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const books = require('../books/books.js')
let users = [{"email":"aamir@gmail.com","password":"aamir123"},{"hamza":"hamza@gmail.com","password":"hamza123"}];


//Login Endpoint
router.post("/valid/login", (req,res) => { 
    const email = req.body.email;
    const password = req.body.password;
  
    if (!email || !password) {
      return res.status(404).json({message: "Email or Password is Empty"});
    }
    const validUser=users.filter((user)=>{
        return user.email=email && user.password==password
    })
    if(validUser)
    {
        let jwtToken = jwt.sign({
            data: password
          }, 'IAmGeneratingTokenToAuthticateCredintialBelongToUser', { expiresIn: 60 * 60 });
      
          req.session.authorization = {
            jwtToken,email
          }
          return res.status(200).send("Login Successful");    
    } else {
      return res.status(400).json({message: "Login Failed,Try Again"});
    }
  });
  
// Endpoint for deleting the book review

router.delete("/valid/bookreview/:ISBN", (req, res) => {
    const email = req.session.authorization.email;
    const isbn = req.params.ISBN;
    const bookReview = books.filter((book) => {
        return book.ISBN == isbn
    })
    if (bookReview){
          delete bookReview.reviews[email];
          return res.status(200).send("Review of The Book Deleted");   
    }
    else {
      return res.status(404).json({message: "ISBN Number not found"});
    }
  });   

// Endpoint for Giving the book review

router.put("/valid/bookreview/:ISBN", (req, res) => {
    const review = req.body.review;
    const isbn = req.params.ISBN;
    const email = req.session.authorization.email;

    const bookReview = books.filter((book) => {
        return book.ISBN == isbn
    })
    if (bookReview){
        bookReview.reviews[email] = review;
          return res.status(200).send("You succesfullt give reviiew for the book");  
    }
    else {
      return res.status(404).json({message: "ISBN Number not found"});
    }
  });
  module.exports = router