import ShoppingCartOverview from "../components/ShoppingCart/ShoppingCartOverview";
import { parseCookies } from "nookies";
import url from "../utils/url";
import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
function Shoppingcart({ books, user }) {
  const [booksCart, setBooksCart] = useState(books);
  const [success, setSucces] = useState(false);
  async function deleteFromCart(id) {
    const token = cookie.get("token");
    const deleteBook = await axios.delete(`${url}api/shoppingcart`, {
      params: { id },
      headers: { Authorization: token }
    });
    setBooksCart(deleteBook.data);
  }
  async function checkout(data) {
    try {
      const token = cookie.get("token");
      const payload = { data };
      const headers = { headers: { Authorization: token } };
      await axios.post(`${url}api/checkout`, payload, headers);
      setSucces(true);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ShoppingCartOverview
      deleteFromCart={deleteFromCart}
      user={user}
      books={booksCart}
      checkout={checkout}
      success={success}
    />
  );
}

Shoppingcart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { books: [] };
  }
  const cart = await axios.get(`${url}api/shoppingcart`, {
    headers: { Authorization: token }
  });

  return { books: cart.data };
};
export default Shoppingcart;
