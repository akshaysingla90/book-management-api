const BookModel = require('../models/Book');
const bookService = {}

//function to create the book
bookService.createBook = async (criteria) => {
  return await BookModel.create(criteria);
}

//function to find  all the books
bookService.findBooks = async (criteria = {}) => {
  return await BookModel.find(criteria, {}, { lean: true });

}

module.exports = bookService;