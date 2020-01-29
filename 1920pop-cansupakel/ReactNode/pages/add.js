import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import url from "../utils/url";
const BOOK = {
  title: "",
  author: "",
  price: "",
  picture: "",
  description: ""
};

function AddBook() {
  const [book, setBook] = useState(BOOK);
  const [getPicture, setPicture] = useState("");
  const [success, setSuccess] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const empty = Object.values(book).every(el => Boolean(el));
    empty ? setDisable(false) : setDisable(true);
  }, [book]);
  async function imageUpload() {
    const data = new FormData();
    data.append("file", book.picture);
    data.append("upload_preset", "bookshop");
    data.append("cloud_name", "cansupakel");
    data.append("tags", "browser_upload");
    data.append("API_key", process.env.API_KEY_CLOUDINARY);
    data.append("API_secret", process.env.API_SECRET_CLOUDINARY);
    console.log(data);
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    };
    const bookPicture = await axios.post(
      "https://api.cloudinary.com/v1_1/cansupakel/image/upload",
      data,
      config
    );
    console.log(bookPicture);

    const pictureUrl = bookPicture.data.url;
    console.log(pictureUrl);
    return pictureUrl;
  }

  function getValueFromChange(event) {
    const { name, value, files } = event.target;
    if (name === "picture") {
      setBook(prevState => ({ ...prevState, picture: files[0] }));
      setPicture(window.URL.createObjectURL(files[0]));
    } else {
      setBook(prevState => ({ ...prevState, [name]: value }));
    }
  }

  async function addBook(event) {
    try {
      event.preventDefault();
      const picture = await imageUpload();

      const response = await axios.post(`${url}api/book`, {
        ...book,
        picture
      });

      setBook(BOOK);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form success={success} onSubmit={addBook}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Input
            name="title"
            label="title"
            placeholder="title"
            value={book.title}
            onChange={getValueFromChange}
          />
          <Form.Input
            name="author"
            label="author"
            placeholder="author"
            value={book.author}
            onChange={getValueFromChange}
          />
          <Form.Input
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={book.price}
            onChange={getValueFromChange}
          />
          <Form.Input
            name="picture"
            type="file"
            label="picture"
            accept="image/*"
            content="Select picture"
            onChange={getValueFromChange}
          />
        </Form.Group>
        <Image src={getPicture} rounded centered size="small" />
        <Form.TextArea
          name="description"
          label="Description"
          placeholder="Description"
          onChange={getValueFromChange}
          value={book.description}
        />
        <Form.Button
          color="green"
          content="Add"
          type="submit"
          disabled={disable}
        />
      </Form>
    </div>
  );
}

export default AddBook;
