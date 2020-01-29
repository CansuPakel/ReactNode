import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const ShoppingcartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  books: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      book: {
        type: ObjectId,
        ref: "Book"
      }
    }
  ]
});

export default mongoose.models.Shoppingcart ||
  mongoose.model("Shoppingcart", ShoppingcartSchema);
