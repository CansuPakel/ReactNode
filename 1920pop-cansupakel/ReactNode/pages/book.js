import axios from "axios";
import BookOverview from "../components/Books/BookOverview";
import url from "../utils/url";
function Book({ book, user }) {
  return <BookOverview user={user} {...book} />;
}

Book.getInitialProps = async ({ query: { _id } }) => {
  const response = await axios.get(`${url}api/book`, { params: { _id } });
  return { book: response.data };
};

export default Book;
