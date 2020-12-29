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
      try {
        const allBooks = await Book.find().exec();

        res.json(allBooks);
      }
      catch (error) {
        console.error(error.message);
      }
    })
    
    .post(async function (req, res){
      try {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'title') ||
            req.body.title === '') {
          return res.send('missing required field title');
        }
        const title = req.body.title;

        const newBook = await Book.create({
          title,
          commentcount: 0,
          comments: []
        });
        
        console.log(newBook);
        res.json({newBook});
      }
      catch (error) {
        console.error(error.message);
        res.send(error.message);
      }
    })
    
    .delete(async function(req, res){
      try {
        await Book.deleteMany().exec();
        res.send('complete delete successful');
      }
      catch (error) {
        console.error(error.message);
      }
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const bookid = req.params.id;
      }
      catch (error) {
        console.error(error.message);
      }
    })
    
    .post(function(req, res){
      //json res format same as .get
      try {
        const bookid = req.params.id;
        const comment = req.body.comment;
      }
      catch (error) {
        console.error(error.message);
      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'delete successful'
      try {
        const bookid = req.params.id;
        console.log(bookid);
        await Book.deleteOne({_id: bookid}).orFail().exec();
        res.send('delete successful');
      }
      catch (error) {
        console.error(error.message);
        res.send('no book exists');
      }
    });
  
};
