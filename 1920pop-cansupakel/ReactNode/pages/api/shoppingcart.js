import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Shoppingcart from "../../models/Shoppingcart";
import mongooseDb from "../../utils/mongooseDb";

mongooseDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getRequest(req, res);
      break;
    case "PUT":
      await putRequest(req, res);
      break;
    case "DELETE":
      await deleteRequest(req, res);
  }
};

async function getRequest(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );
    const cart = await Shoppingcart.findOne({ user: userId }).populate({
      path: "books.book",
      model: "Book"
    });
    res.status(200).json(cart.books);
  } catch (error) {
    console.error(error);
    res.status(403).send("Not auth");
  }
}

async function putRequest(req, res) {
  const { quantity, _id } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).send("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );
    const cart = await Shoppingcart.findOne({ user: userId });
    const alreadyBook = cart.books.some(doc => ObjectId(_id).equals(doc.book));
    if (alreadyBook) {
      await Shoppingcart.findOneAndUpdate(
        { _id: cart._id, "books.book": _id },
        { $inc: { "books.$.quantity": quantity } }
      );
    } else {
      const newBook = { quantity, book: _id };
      await Shoppingcart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { books: newBook } }
      );
    }
    res.status(200).send("Shoppingcart updated");
  } catch (error) {
    console.error(error);
    res.status(403);
  }
}

async function deleteRequest(req, res) {
  const { id } = req.query;

  if (!req.headers.authorization) {
    return res.status(401).send("No token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );
    const cart = await Shoppingcart.findOneAndUpdate(
      { user: userId },
      { $pull: { books: { book: id } } },
      { new: true }
    ).populate({
      path: "books.book",
      model: "Book"
    });
    res.status(200).json(cart.books);
  } catch (e) {
    console.log(e);
  }
}
