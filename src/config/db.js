const { Sequelize } = require("sequelize");

module.exports = new Sequelize("invent-db", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});
