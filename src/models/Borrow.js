const { Sequelize, DataTypes } = require("sequelize");
const moment = require("moment");

const db = require("../config/db");

const Book = require("./Book");
const User = require("./User");

const Borrow = db.define(
  "Borrow",
  {
    borrowed_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: moment().format(),
    },
    returned_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    ratings: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        min: 0,
        max: 10,
      },
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Book, { through: Borrow, foreignKey: "userId" });
Book.belongsToMany(User, { through: Borrow, foreignKey: "bookId" });
Borrow.sync({ alter: true });

module.exports = Borrow;
