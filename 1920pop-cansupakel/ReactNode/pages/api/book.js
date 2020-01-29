import Book from "../../models/Book";
import mongooseDb from "../../utils/mongooseDb";
import Shoppingcart from "../../models/Shoppingcart";
mongooseDb();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getRequest(req, res);
      break;
    case "DELETE":
      await deleteRequest(req, res);
      break;
    case "POST":
      await postRequest(req, res);
      break;
  }
};

async function getRequest(req, res) {
  const { _id } = req.query;
  const book = await Book.findOne({ _id });
  res.status(200).json(book);
}

async function deleteRequest(req, res) {
  const { _id } = req.query;
  const book = await Book.findByIdAndDelete({ _id });
  await Shoppingcart.updateMany(
    { "books.book": _id },
    { $pull: { books: { book: _id } } }
  );
  res.status(200).json({});
}
async function postRequest(req, res) {
  const { title, author, price, description, picture } = req.body;
  if (!title || !author || !price || !description || !picture) {
    return res.status(400).send("Fields missing");
  }
  const book = await new Book({
    title,
    author,
    price,
    description,
    picture
  }).save();

  res.status(202).json(book);
}
