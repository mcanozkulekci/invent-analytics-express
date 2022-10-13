const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.sync({ alter: true });

module.exports = { User };
