import mongoose from 'mongoose';
import Order from '../models/Order.js';
import { Product } from '../models/Product.js';

// CREATE USER
export const createOrder = async (req, res) => {
  try {
    // CHECKING IF USER IS LOGGED IN
    if (!req.user || !req.user.id) {
      return res.status(400).json({ success: false, message: 'Unauthorized' });
    }

    console.log('Authenticated user:', req.user);
    console.log('req.user._id:', req.user.id);
    console.log('typeof req.user._id:', typeof req.user.id);

    // TAKING THE DATA THAT REQUIRES TO CREATE ORDER
    const { items, shippingAddress, paymentMethod, paymentId } = req.body;

    // CALCULATE TOTAL AMOUNT OF THE CART
    const products = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        return {
          price: product.price,
          quantity: item.quantity,
        };
      })
    );

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // AUTHENTICATION
    if (
      !items ||
      !items.length ||
      !totalAmount ||
      !shippingAddress ||
      !paymentId
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    // CREATE NEW ORDER
    const newOrder = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentId,
    });

    res.status(201).json({ success: true, newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server Error' });
  }
};

// GET USERS
export const getOrders = async (req, res) => {};

// GET USER
export const getOrder = async (req, res) => {};

// UPDATE USER
export const updateOrder = async (req, res) => {};

// DELETE USER
export const deleteOrder = async (req, res) => {};
