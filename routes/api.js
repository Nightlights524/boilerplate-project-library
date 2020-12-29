'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("SUCCESSFUL DATABASE CONNECTION");
});

const bookSchema = new mongoose.Schema({
  title: String,
  commentcount: Number,
  comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
      }
      catch (error) {
        console.error(error);
      }
    })
    
    .post(async function (req, res){
      //response will contain new book object including atleast _id and title
      try {
        const title = req.body.title;
      }
      catch (error) {
        console.error(error);
      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      try {
      }
      catch (error) {
        console.error(error);
      }
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const bookid = req.params.id;
      }
      catch (error) {
        console.error(error);
      }
    })
    
    .post(function(req, res){
      //json res format same as .get
      try {
        const bookid = req.params.id;
        const comment = req.body.comment;
      }
      catch (error) {
        console.error(error);
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'delete successful'
      try {
        const bookid = req.params.id;
      }
      catch (error) {
        console.error(error);
      }
    });
  
};
