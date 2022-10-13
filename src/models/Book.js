const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const Book = db.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
    },
    borrow_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    average_rating: {
      type: DataTypes.REAL,
      defaultValue: 0.0,
    },
    isBorrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Book.sync({ alter: true });

module.exports = {
  Book,
};
