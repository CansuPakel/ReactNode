import { Menu, Container } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import logout from "../../utils/logout";
function Header({ user }) {
  const admin = user && user.role === "admin";
  const normal = user && user.role === "user";

  const router = useRouter();
  function getActive(route) {
    return route === router.pathname;
  }
  return (
    <Menu stackable pointing="true" secondary="true">
      <Container>
        <Link href="/">
          <Menu.Item active={getActive("/")}>Bookshop</Menu.Item>
        </Link>

        <Link href="/shoppingcart">
          <Menu.Item active={getActive("/shoppingcart")}>
            Shoppingcart
          </Menu.Item>
        </Link>

        {admin && (
          <Link href="/add">
            <Menu.Item active={getActive("/add")}>Add</Menu.Item>
          </Link>
        )}
        <Menu.Menu position="right">
          {user ? (
            <div>
              <Link href="/profile">
                <Menu.Item active={getActive("/profile")}>Profile</Menu.Item>
              </Link>
              <Menu.Item onClick={logout}>Logout</Menu.Item>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <Menu.Item active={getActive("/login")}>Login</Menu.Item>
              </Link>
              <Link href="/register">
                <Menu.Item active={getActive("/register")}>Register</Menu.Item>
              </Link>
            </div>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;
