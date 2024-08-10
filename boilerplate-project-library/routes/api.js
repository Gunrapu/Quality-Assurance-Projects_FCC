'use strict';

const books = {}; // In-memory storage for books

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res) {
      const booksArray = Object.keys(books).map(id => ({
        _id: id,
        title: books[id].title,
        commentcount: books[id].comments.length
      }));
      res.json(booksArray);
    })
    
    .post(function (req, res) {
      const title = req.body.title;
      if (!title) {
        return res.send('missing required field title');
      }

      const id = Date.now().toString();
      books[id] = { title, comments: [] };
      res.json({ _id: id, title });
    })
    
    .delete(function(req, res){
      for (const id in books) {
        delete books[id];
      }
      res.send('complete delete successful');
    });

  app.route('/api/books/:id')
    .get(function (req, res) {
      const bookid = req.params.id;
      const book = books[bookid];
      if (!book) {
        return res.send('no book exists');
      }
      res.json({ _id: bookid, title: book.title, comments: book.comments });
    })
    
    .post(function(req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;
      const book = books[bookid];

      if (!book) {
        return res.send('no book exists');
      }
      if (!comment) {
        return res.send('missing required field comment');
      }

      book.comments.push(comment);
      res.json({ _id: bookid, title: book.title, comments: book.comments });
    })
    
    .delete(function(req, res) {
      const bookid = req.params.id;
      if (!books[bookid]) {
        return res.send('no book exists');
      }

      delete books[bookid];
      res.send('delete successful');
    });
};
