import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
  getOrderById,
} from "../controllers/orderController.js";

import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliverd);

export default router;
