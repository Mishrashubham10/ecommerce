import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  sellerProducts,
  updateProduct,
} from '../controllers/product.controllers.js';
import { authorizeRoles, verifyJwt } from '../middlewares/verifyJwt.js';

const router = Router();

// PUBLIC ROUTES
router.get('/', getProducts);
router.get('/:id', getProduct);

// PRIVATE ROUTES
router.post('/', verifyJwt, authorizeRoles('Admin', 'Seller'), createProduct);
// THIS IS TO GET PRODUCTS BY SELLER
router.get(
  '/my-products',
  verifyJwt,
  authorizeRoles('Seller'),
  sellerProducts
);
router.put(
  '/:id',
  verifyJwt,
  authorizeRoles('Admin', 'Seller'),
  updateProduct
);
router.delete(
  '/:id',
  verifyJwt,
  authorizeRoles('Admin', 'Seller'),
  deleteProduct
);

export default router;