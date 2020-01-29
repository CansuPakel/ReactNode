import React, { useEffect } from "react";
import axios from "axios";
import BookList from "../components/Books/BookList";
import url from "../utils/url";

function Home(props) {

  return <BookList books={props.books} />;
}

Home.getInitialProps = async () => {
  const response = await axios.get(`${url}api/books`);
  return { books: response.data };
};
export default Home;
