import { Header, Button, Segment, Item, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import totalCart from "../../utils/totalCart.js";
import StripCheckout from "react-stripe-checkout";

import React, { useState, useEffect } from "react";
function Shoppingcart({ books = [], user, deleteFromCart, checkout, success }) {
  const [cartEmpty, setCartEmpty] = useState(false);
  const [Amount, setAmount] = useState(0);

  useEffect(() => {
    const { total } = totalCart(books);
    setAmount(total);

    setCartEmpty(books.length === 0);
  }, [books]);
  const router = useRouter();
  function mapBooksToItems(books) {
    return books.map(b => ({
      childkey: b.book._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/book?_id=${b.book._id}`)}
        >
          {b.book.title}
        </Item.Header>
      ),
      content: (
        <Item.Header verticalAlign="middle">
          {b.quantity} x {b.book.price}
        </Item.Header>
      ),
      image: b.book.picture,
      meta: `${b.book.author}`,

      extra: (
        <Button floated="right" onClick={() => deleteFromCart(b.book._id)}>
          X
        </Button>
      )
    }));
  }
  if (success) {
    <Message success icon="check" header="Success!" content="Order succes" />;
  }
  if (books.length === 0) {
    return (
      <div>
        <Segment piled>
          <Header>No books in cart</Header>
          <Segment.Inline>
            {user ? (
              <Button primary onClick={() => router.push("/")}>
                Show book
              </Button>
            ) : (
              <Button primary onClick={() => router.push("/login")}>
                Login for your cart
              </Button>
            )}
          </Segment.Inline>
        </Segment>
      </div>
    );
  }
  return (
    <div>
      <Segment>
        <Item.Group items={mapBooksToItems(books)} />
      </Segment>
      <Segment size="huge">
        <Segment.Inline>
          Total price € {Amount}
          <StripCheckout
            name="Checkout"
            amount={Amount * 100}
            currency="EUR"
            shippingAddress={true}
            token={checkout}
            stripeKey="pk_test_InROPuhXup5d2Z6UTL1LEtBq00f2mAYx1e"
          >
            <Button
              color="blue"
              floated="right"
              disabled={cartEmpty || success}
            >
              Checkout
            </Button>
          </StripCheckout>
        </Segment.Inline>
      </Segment>
    </div>
  );
}

export default Shoppingcart;
