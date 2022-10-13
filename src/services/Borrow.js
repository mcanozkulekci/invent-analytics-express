const Borrow = require("../models/Borrow");

const insertBorrow = (data) => {
  return Borrow.create(data);
};
const list = () => {
  return Borrow.findAll();
};
const findOneBorrow = (where) => {
  return Borrow.findOne(where);
};
const updateBorrow = (data, id) => {
  return Borrow.update(data, { where: { bookId: id.bookId } });
};
module.exports = {
  insertBorrow,
  list,
  findOneBorrow,
  updateBorrow,
};
