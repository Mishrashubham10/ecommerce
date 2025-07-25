import Router from 'express';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../controllers/order.controllers';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.post('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;