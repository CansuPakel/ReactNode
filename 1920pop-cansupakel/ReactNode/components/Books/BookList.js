import { Card } from "semantic-ui-react";
function BookList(props) {
  function mapBooksToItems(books) {
    return books.map(book => ({
      header: book.title + "        €" + book.price,
      image: book.picture,

      meta: book.author,
      color: "teal",
      fluid: true,
      childKey: book._id,
      href: `/book?_id=${book._id}`
    }));
  }
  return (
    <Card.Group
      itemsPerRow={4}
      centered
      stackable
      items={mapBooksToItems(props.books)}
    ></Card.Group>
  );
}

export default BookList;
