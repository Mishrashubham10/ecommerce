import Router from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controllers.js';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;