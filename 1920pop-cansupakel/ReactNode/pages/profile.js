import ProfileOverview from "../components/Profile/ProfileOverview";
import ProfileOrders from "../components/Profile/ProfileOrders";
import { parseCookies } from "nookies";
import url from "../utils/url";
import axios from "axios";
function Profile({ user, orders }) {
  return (
    <div>
      <ProfileOverview {...user} /> <ProfileOrders orders={orders} />
    </div>
  );
}

Profile.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const orders = await axios.get(`${url}api/orders`, payload);
  return orders.data;
};

export default Profile;
