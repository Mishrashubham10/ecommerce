import { Router } from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controllers.js';
import { authorizeRoles, verifyJwt } from '../middlewares/verifyJwt.js';

const router = Router();

// ROUTES & CONTROLLERS
router.get('/', verifyJwt, authorizeRoles('Admin'), getOrders);
router.post('/', verifyJwt, createOrder);
router.post('/:id', verifyJwt, getOrder);
router.put('/:id', verifyJwt, updateOrder);
router.delete('/:id', verifyJwt, deleteOrder);

export default router;