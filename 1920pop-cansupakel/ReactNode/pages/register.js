import { Button, Form, Message, Segment } from "semantic-ui-react";
import React, { useState, prevState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import url from "../utils/url";
import { auth } from "../utils/auth";
import getError from "../utils/getError";

const userEmpty = {
  firstname: "",
  lastname: "",
  email: "",
  password: ""
};

function Register() {
  const [user, setUser] = useState(userEmpty);
  const [disable, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);
  function changeUser(event) {
    const { name, value } = event.target;

    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function submitForm(event) {
    event.preventDefault();
    try {
      setError("");

      const response = await axios.post(`${url}api/register`, { ...user });
      auth(response.data);
    } catch (error) {
      getError(error, setError);

      console.log(error);
    }
  }
  return (
    <div>
      <Form onSubmit={submitForm} error={Boolean(error)}>
        <Message error content={error} />

        <Segment>
          <Form.Input
            label="firstname"
            placeholder="firstname"
            name="firstname"
            value={user.firstname}
            onChange={changeUser}
          />
          <Form.Input
            label="lastname"
            placeholder="lastname"
            name="lastname"
            value={user.lastname}
            onChange={changeUser}
          />
          <Form.Input
            label="email"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={changeUser}
          ></Form.Input>
          <Form.Input
            type="password"
            label="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={changeUser}
          ></Form.Input>
          <Button color="green" disabled={disable}>
            Register
          </Button>
        </Segment>
      </Form>
      <Message attached="bottom">
        Do you have already an account?
        <Link href="/login">
          <a> Login</a>
        </Link>
      </Message>
    </div>
  );
}

export default Register;
