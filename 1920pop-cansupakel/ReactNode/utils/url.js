const url =
  process.env.NODE_ENV === "production"
    ? "https://bookshop-react-node.herokuapp.com/"
    : "http://localhost:3000/";

export default url;
