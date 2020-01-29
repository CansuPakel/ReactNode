function totalCart(books) {
  const booksTotal = books.reduce((accum, el) => {
    accum += el.book.price * el.quantity;
    return accum;
  }, 0);
  const total = ((booksTotal * 100) / 100).toFixed(2);
  return { total };
}
export default totalCart;
