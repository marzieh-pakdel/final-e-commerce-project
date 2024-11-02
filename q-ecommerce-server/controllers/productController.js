import { PER_PAGE, STORAGE } from "../constants/settings.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  // form-data type
  // it required name of uploaded image with a key name image
  try {
    const { name, description, price, category, quantity } = req.fields;
    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const existingCategory = await Category.findOne({ _id: category });

    if (!existingCategory) {
      return res.status(400).json({ error: "Category is not exists!" });
    }

    const product = new Product({ ...req.fields, countInStock: quantity });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const existingCategory = await Category.findOne({ _id: category });

    if (!existingCategory) {
      return res.status(400).json({ error: "Category is not exists!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, countInStock: quantity },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  // pass size and page as a query string (optional)
  try {
    const { size = PER_PAGE, page = 1 } = req.query;

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
      .limit(size)
      .skip(size * (page - 1))
      .then((data) => {
        return data.map((item) => {
          item.image = STORAGE + item.image;
          return item;
        });
      });

    const total = Math.ceil(count / size);

    res.json({
      products,
      page: Number(page),
      total,
      hasMore: total > page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).then((product) => {
      product.image = STORAGE + product.image;
      return product;
    });

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 })
      .then((data) => {
        return data.map((item) => {
          item.image = STORAGE + item.image;
          return item;
        });
      });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ rating: -1 })
      .limit(4)
      .then((data) => {
        return data.map((item) => {
          item.image = STORAGE + item.image;
          return item;
        });
      });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ _id: -1 })
      .limit(5)
      .then((data) => {
        return data.map((item) => {
          item.image = STORAGE + item.image;
          return item;
        });
      });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    //   {
    //     "categories" : ["66c24b97b59dea2f14572dc0"],
    //     "price" : [1000, 2000]
    // }
    const { categories, price } = req.body;

    let args = {};
    if (categories.length > 0) args.category = categories;
    if (price.length) args.price = { $gte: price[0], $lte: price[1] };

    const products = await Product.find(args).then((data) => {
      return data.map((item) => {
        item.image = STORAGE + item.image;
        return item;
      });
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
