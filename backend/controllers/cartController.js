import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";
const getCartDetails = asyncHandler(async (req, res) => {
  const cartDetails = await Cart.findOne({ user: req.params.id });
  if (cartDetails) {
    res.status(200).json(cartDetails);
  } else {
    res.status(400);
    throw new Error("No Cart");
  }
});
const saveCartDetails = asyncHandler(async (req, res) => {
  const { userId, cartItems } = req.body;
  console.log("cartDetails");
  const cartDetails = await Cart.create({
    user: userId,
    cartItems: cartItems.map((item) => ({
      brand: item.brand,
      category: item.category,
      countInStock: item.countInStock,
      description: item.description,
      image: item.image,
      name: item.name,
      price: item.price,
      qty: item.qty,
    })),
  });

  console.log(cartDetails);
  if (cartDetails) {
    res.status(200).json(cartDetails);
  } else {
    res.status(400);
    throw new Error("No Cart");
  }
});

export { getCartDetails, saveCartDetails };
