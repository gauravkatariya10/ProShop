import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

router.route("/:id").put(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
