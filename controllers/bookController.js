const { bookService } = require('../services')
const bookController = {}

/**
 *  function to get books of a pump
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
bookController.getBooks = async (req, res, next) => {
  try {
    let criteria = { };
    const books = await bookService.findBooks(criteria);

    return res.status(200).json({ success: true, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
};


/**
 * function to add book
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
bookController.addBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook({name:req.body.name});
    return res.status(200).json({ success: true, book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error' });
  }
};



module.exports = bookController;