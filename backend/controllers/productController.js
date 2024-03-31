import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// const getSearchedProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findOne({ name: req.params.name });
//   if (product) return res.status(200).json(product);
//   res.status(404);
//   throw new Error("Not Found");
// });

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  res.status(404);
  throw new Error("Not Found");
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    price: 0,
    user: req.user._id,
    image: "/images/smaple.jpg",
    brand: "Sample",
    category: "sample",
    countInStock: 0,
    numReviews: 0,
    description: "Sample",
  });
  const createdProduct = await product.save();
  res.json(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    return res.status(200);
  }
  res.status(404);
  throw new Error("Not Found");
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.body.price);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();
    // console.log(updatedProduct);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewd) {
      res.status(400);
      throw new Error("Product Already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();

    res.status(201).json({ message: "Review added" });
  }
  res.status(404);
  throw new Error("Not Found");
});

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
