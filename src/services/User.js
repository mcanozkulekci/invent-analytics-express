const User = require("../models/User");
const Book = require("../models/Book");

const list = () => {
  return User.findAll({
    include: [
      {
        model: Book, // include data from Book model
        attributes: ["name", "average_rating", "isBorrowed"], // include only these fields
        group: "isBorrowed",
        through: {
          attributes: ["borrowed_at", "ratings"], // include these fields from Borrow model
        },
      },
    ],
  });
};

const findOne = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Book, // include data from Book model
        attributes: ["name", "average_rating", "isBorrowed"], // include only these fields
        group: "isBorrowed",
        through: {
          attributes: ["borrowed_at", "ratings"], // include these fields from Borrow model
        },
      },
    ],
  });
};

const insert = (data) => {
  return User.create(data);
};

module.exports = {
  list,
  findOne,
  insert,
};
