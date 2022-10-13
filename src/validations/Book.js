const { body } = require("express-validator");

const BookValidation = () => {
  return [body("name").not().isEmpty().isLength({ min: 2 })];
};

module.exports = BookValidation;
