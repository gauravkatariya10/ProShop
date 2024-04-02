import Product from "../models/productModel.js";

export const checkInventory = async (orderItems) => {
  // Using Promise.all with map
  const results = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item._id);
      console.log(product.countInStock - item.qty);
      if (product && product.countInStock - item.qty < 0) {
        console.log(product.countInStock - item.qty);
        return true;
      }
      return false;
    })
  );

  if (results.includes(true)) {
    return true; // At least one item has insufficient stock
  }

  return false;
};
