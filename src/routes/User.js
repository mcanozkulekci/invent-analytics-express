const express = require("express");

const {
  getUserDetails,
  create,
  borrowBook,
  returnBook,
  getAllUsers,
} = require("../controllers/User");

const validate = require("../middlewares/validate");
const UserValidation = require("../validations/User");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserDetails);
router.route("/").post(UserValidation(), validate, create);
router.post("/:userId/borrow/:bookId", borrowBook);
router.post("/:userId/return/:bookId", returnBook);

module.exports = router;
