import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
import { errHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

const app = express();

dotenv.config();

connectDB();

//used to parse incoming requests with JSON payloads
app.use(express.json());
// This middleware is used to parse incoming requests with URL-encoded payloads.
//middleware parses data and makes it available in req.body object of your Express.js routes.
app.use(express.urlencoded({ extended: true }));

//to parse the cookie
app.use(cookieParser());

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);

// app.use("/api/categories", categoryRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", index.html));
  });
} else {
  app.get("/", (req, res) => {
    console.log("Running");
  });
}

app.use(notFound);
app.use(errHandler);
app.listen(port, () => console.log(`server is running on ${port}`));
