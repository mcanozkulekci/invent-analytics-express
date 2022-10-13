const { list, findOne, insert } = require("../services/User");
const { findOneBook, update } = require("../services/Book");
const {
  insertBorrow,
  findOneBorrow,
  updateBorrow,
} = require("../services/Borrow");

const moment = require("moment");

const getAllUsers = (req, res) => {
  list()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const getUserDetails = (req, res) => {
  findOne(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).send("Bu idye sahip bir kullanici bulunamadi");
      } else {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const create = (req, res) => {
  insert(req.body)
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "Kullanici basariyla eklendi",
        response,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const borrowBook = (req, res) => {
  findOne(req.params.userId)
    .then((response) => {
      if (!response) {
        res.status(404).send("Bu idye sahip bir kullanici bulunamadi");
      } else {
        findOneBook(req.params.bookId)
          .then((book) => {
            if (!book) {
              res.status(404).send("Bu idye sahip bir kitap bulunamadi");
            } else {
              if (book.isBorrowed) {
                res.status(409).send("Kitap zaten odunc alindi");
              } else {
                try {
                  insertBorrow({
                    userId: req.params.userId,
                    bookId: req.params.bookId,
                  });
                } catch (e) {
                  res.status(500).send(e.message + "d");
                }
                var newLoanCount = book.borrow_count + 1;
                console.log(newLoanCount);
                update(
                  { isBorrowed: true, borrow_count: newLoanCount },
                  { id: req.params.bookId }
                )
                  .then((response) => {
                    res.status(200).json({
                      success: true,
                      message: "Kitap odunc alindi",
                      response,
                    });
                  })
                  .catch((error) => {
                    res.status(500).send(error.message);
                  });
              }
            }
          })
          .catch((error) => {
            res.status(404).send(error.message);
          });
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const returnBook = (req, res) => {
  findOneBook(req.params.bookId)
    .then((book) => {
      if (!book.isBorrowed) {
        res.status(500).send("Kitap odunc alinmadi");
      } else {
        findOneBorrow({
          where: {
            userId: req.params.userId,
            bookId: req.params.bookId,
          },
        })
          .then((loan) => {
            console.log(loan.bookId);
            var returned_at = moment().format();
            var ratings = req.body.score;
            updateBorrow(
              { returned_at: returned_at, ratings: ratings },
              { bookId: loan.bookId }
            )
              .then((response) => {
                var borrow_count = book.borrow_count;
                var updatedRatings =
                  ratings + (borrow_count - 1) * book.average_rating;
                var averageRating = updatedRatings / borrow_count;
                update(
                  { average_rating: averageRating, isBorrowed: false },
                  { id: req.params.bookId }
                );
                res.status(200).json({
                  success: true,
                  message: "Kitap basariyla iade edildi",
                  response,
                });
              })
              .catch((error) => res.status(500).send(error.message));
          })
          .catch(() => {
            res
              .status(500)
              .send("Sizde bulunmayan bir kitabi teslim edemezsiniz");
          });
      }
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
};

module.exports = {
  getAllUsers,
  getUserDetails,
  create,
  borrowBook,
  returnBook,
};
