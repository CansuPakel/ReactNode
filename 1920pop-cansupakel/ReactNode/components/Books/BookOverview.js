import { Item, Button, Input } from "semantic-ui-react";
import BookDelete from "./BookDelete";
import React, { useState } from "react";
import { Router } from "next/router";
import { useRouter } from "next/router";
import axios from "axios";
import url from "../../utils/url";
import cookie from "js-cookie";
function BookOverview({
  _id,
  title,
  picture,
  author,
  price,
  description,
  user
}) {
  const router = useRouter();
  const admin = user && user.role === "admin";
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  async function addBookToCart() {
    try {
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const response = await axios.put(
        `${url}api/shoppingcart`,
        {
          quantity,
          _id
        },
        headers
      );
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Item.Group>
      <Item>
        <Item.Image size="large" src={picture} />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>
            <span>{author}</span>
          </Item.Meta>
          <Item.Description>{description} </Item.Description>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={event => setQuantity(Number(event.target.value))}
            placeholder="quantity"
            action={
              user && success
                ? {
                    color: "blue",
                    content: "Item added",
                    disabled: true
                  }
                : user
                ? {
                    color: "blue",
                    content: "Add to shoppingcart",
                    onClick: addBookToCart
                  }
                : {
                    color: "blue",
                    content: "Login for add to cart",
                    onClick: () => router.push("/login")
                  }
            }
          />
          {admin && <BookDelete _id={_id} />}
        </Item.Content>
        <Item.Content extra>
          <Item.Header>€{price}</Item.Header>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}
export default BookOverview;
