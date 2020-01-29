import cookie from "js-cookie";
import Router from "next/router";
export function auth(token) {
  cookie.set("token", token);
  Router.push("/profile");
}

export function redirectUnAuth(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}
