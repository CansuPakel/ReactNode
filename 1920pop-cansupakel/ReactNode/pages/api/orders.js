import jwt from "jsonwebtoken";
import mongooseDb from "../../utils/mongooseDb";
import Order from "../../models/Order";

mongooseDb();
export default async (req, res) => {
 
  if (!req.headers.authorization) {
    return res.status(401).send("No auth token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );
    const orders = await Order.find({ user: userId }).populate({
      path: "books.book",
      model: "Book"
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(403).send("Please login");
    console.log(error);
  }
};
