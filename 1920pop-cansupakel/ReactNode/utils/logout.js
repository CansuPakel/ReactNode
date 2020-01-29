import cookie from "js-cookie";
import Router from "next/router";
export default function logout() {
  cookie.remove("token");
  Router.push("/login");
}
