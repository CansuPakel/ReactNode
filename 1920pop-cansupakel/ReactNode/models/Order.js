import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema(
  {
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
    ],
    email: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
