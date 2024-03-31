import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartItems: [
    {
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
