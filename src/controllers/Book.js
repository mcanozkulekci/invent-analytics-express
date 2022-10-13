const { list, findOneBook, insert } = require("../services/Book");

const listAllBooks = (req, res) => {
  list()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const getBookDetails = (req, res) => {
  findOneBook(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).send("Bu idye sahip bir kitap bulunamadi");
      } else {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const createNewBook = (req, res) => {
  insert(req.body)
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "Kitap basariyla eklendi",
        response,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  listAllBooks,
  getBookDetails,
  createNewBook,
};
