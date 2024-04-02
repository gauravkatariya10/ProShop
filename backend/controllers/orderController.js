import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { checkInventory } from "../utils/checkInventory.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const valid = await checkInventory(orderItems);
  console.log("valid", valid);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else if (valid) {
    console.log("called inventory");
    res.status(400);
    throw new Error("Product out of stock");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        name: x.name,
        qty: x.qty,
        image: x.image,
        price: x.price,
        product: x._id,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    orderItems.map((x) => updateStocks(x));
    res.status(200).json(createdOrder);
  }
});

//Helper function to update the stock value after order is placed
const updateStocks = asyncHandler(async (orderProduct) => {
  const product = await Product.findById(orderProduct._id);
  if (product) {
    product.countInStock -= orderProduct.qty;
    await product.save();
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orders) res.status(200).json(orders);
  else res.status(404);
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: res.body.status,
        update_time: res.body.update_time,
        email_address: res.body.email_address,
      });
    const updatedOrder = await order.save();
    // console.log(order.orderItems);
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  }
  return res.status(404).json({ message: "order not found" });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json(orders);
});

export {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
  getOrderById,
};
