import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUnAuth } from "../utils/auth";
import url from "../utils/url";
import axios from "axios";
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const route = ctx.pathname === "/profile" || ctx.pathname === "/create";

      if (route) {
        redirectUnAuth(ctx, "/login");
      }
    } else {
      try {
        const response = await axios.get(`${url}api/profile`, {
          headers: { Authorization: token }
        });

        const user = response.data;
        const admin = user.role === "admin";
        const addBook = !admin && ctx.pathname === "/add";
        if (addBook) {
          redirectUnAuth(ctx, "/");
        }
        pageProps.user = user;
      } catch (error) {
        console.log(error);

        destroyCookie(ctx, "token");
        redirectUnAuth(ctx, "/login");
      }
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
