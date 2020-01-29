import {
  Header,
  Accordion,
  Label,
  Segment,
  List,
  Image
} from "semantic-ui-react";

function ProfileOrders({ orders }) {
  function mapOrder(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: (
          <Label content={new Date(order.createdAt).toLocaleDateString()} />
        )
      },
      content: {
        content: (
          <div>
            <List>
              {order.books.map(b => (
                <List.Item key={b.book._id}>
                  <Image avatar src={b.book.picture} />
                  <List.Content>
                    <List.Header>{b.book.title}</List.Header>
                    <List.Description>
                      {b.quantity} x €{b.book.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label>total {order.total}</Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        )
      }
    }));
  }

  return (
    <div>
      <Header as="h1">Order history</Header>
      {orders.length === 0 ? (
        <Segment inverted color="orange" textAlign="center">
          <Header>No orders</Header>
        </Segment>
      ) : (
        <Accordion fluid styled exclusive={false} panels={mapOrder(orders)} />
      )}
    </div>
  );
}

export default ProfileOrders;
