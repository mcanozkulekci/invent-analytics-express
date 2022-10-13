const Book = require("../models/Book");

const list = () => {
  return Book.findAll();
};
const findOneBook = (id) => {
  return Book.findByPk(id);
};
const insert = (data) => {
  return Book.create(data);
};
const update = (data, id) => {
  return Book.update(data, { where: { id: id.id } });
};

module.exports = {
  list,
  findOneBook,
  insert,
  update,
};
