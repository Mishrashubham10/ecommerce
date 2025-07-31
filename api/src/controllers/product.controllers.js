import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

// @desc PRODUCTS
// @route GET /
// @access PRIVATE
export const createProduct = async (req, res) => {
  // GET THE PRODUCT DATA
  const { name, description, price, category, stock, images } = req.body;

  // VALIDATE REQUIRED FIELD
  if (!name || !price || !stock || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let categoryId;

  //   CHECKING IF CATEGORY IS A VALID ID
  if (!category.match(/^[0-9a-fA-F]{24}$/)) {
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }
    categoryId = categoryDoc._id;
  }

  // VALIDATE PRICE & STOCK
  if (price < 0 || stock < 0) {
    return res
      .status(400)
      .json({ message: 'Price and stock can not be non-negative' });
  }

  // CREATE PRODUCT
  const product = new Product({
    name,
    description,
    price,
    stock,
    category: categoryId,
    images,
    createdBy: req.user_id,
  });

  // SAVE PRODUCT
  await product.save();

  res.status(201).json({
    message: 'Product created successfully',
    product,
  });
};

// @desc PRODUCTS
// @route GET /
// @access Public
export const getProducts = async (req, res) => {
  res.status(200).json({ message: 'Here are the products' });
};

// @desc PRODUCT
// @route GET /:ID
// @access PUBLIC
export const getProduct = async (req, res) => {
  res.status(200).json({ message: 'Here is the product' });
};

// @desc UPDATE PRODUCT
// @route GET /:ID
// @access PRIVATE
export const updateProduct = async (req, res) => {
  res.status(200).json({ message: 'products updated' });
};

// @desc DELETE PRODUCT
// @route GET /:ID
// @access PRIVATE
export const deleteProduct = async (req, res) => {
  res.status(200).json({ message: 'Here are the products' });
};

// @desc DELETE PRODUCT
// @route GET /:ID
// @access PRIVATE
export const sellerProducts = async (req, res) => {
  res.status(200).json({ message: 'Seller products' });
};
