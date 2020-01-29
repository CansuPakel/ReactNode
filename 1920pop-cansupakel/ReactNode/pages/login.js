import { Button, Form, Message, Segment } from "semantic-ui-react";
import React, { useState, prevState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import url from "../utils/url";
import { auth } from "../utils/auth";
import getError from "../utils/getError";
const userEmpty = {
  email: "",
  password: ""
};

function Login() {
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
      const login = await axios.post(`${url}api/login`, { ...user });
      auth(login.data);
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
            Login
          </Button>
        </Segment>
      </Form>
      <Message attached="bottom">
        new user?
        <Link href="/register">
          <a> Register</a>
        </Link>
      </Message>
    </div>
  );
}

export default Login;
