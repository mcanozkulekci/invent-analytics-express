const express = require("express");

const {
  listAllBooks,
  getBookDetails,
  createNewBook,
} = require("../controllers/Book");

const validate = require("../middlewares/validate");
const BookValidation = require("../validations/Book");

const router = express.Router();

router.get("/", listAllBooks);
router.get("/:id", getBookDetails);
router.route("/").post(BookValidation(), validate, createNewBook);

module.exports = router;
