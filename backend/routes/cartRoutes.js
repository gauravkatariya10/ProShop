import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  getCartDetails,
  saveCartDetails,
} from "../controllers/cartController.js";
const router = express.Router();

router.route("/:id").get(protect, getCartDetails);
router.route("/").put(protect, saveCartDetails);

export default router;
