import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import Shoppingcart from "../../models/Shoppingcart";
import totalCart from "../../utils/totalCart";
import Order from "../../models/Order";
const stripe = Stripe(process.env.STRIPE);
export default async (req, res) => {
  const { data } = req.body;
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );
    const cart = await Shoppingcart.findOne({ user: userId }).populate({
      path: "books.book",
      model: "Book"
    });
    const { total } = totalCart(cart.books);
    const prevCustomer = await stripe.customers.list({
      email: data.email,
      limit: 1
    });

    const existing = prevCustomer.data.length > 0;
    let newCustomer;


    if (!existing) {
      newCustomer = await stripe.customers.create({
        email: data.email,
        source: data.id
      });
    }
    const customer = (existing && prevCustomer.data[0].id) || newCustomer.id;

    const charge = await stripe.charges.create(
      {
        currency: "EUR",
        amount: total * 100,
        receipt_email: data.email,
        customer: customer,
        description: `${data.email}`
      },
      {
        idempotency_key: uuidv4()
      }
    );

    await new Order({
      user: userId,
      email: data.email,
      total: total,
      books: cart.books
    }).save();

    await Shoppingcart.findOneAndUpdate(
      {
        _id: cart._id
      },
      {
        $set: { books: [] }
      }
    );
    res.status(200).send("Checkout succes");
  } catch (e) {}
};
