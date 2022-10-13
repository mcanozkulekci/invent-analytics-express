const { body } = require("express-validator");

const UserValidation = () => {
  return [body("name").not().isEmpty().isLength({ min: 2 })];
};

module.exports = UserValidation;
