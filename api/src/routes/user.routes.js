import Router from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controllers.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';
import { authorizeUser } from '../utils/authorizeUser.js';

const router = Router();

// Allow only Admin to view all users
router.get('/', verifyJwt, authorizeUser(['Admin']), getUsers);

// Allow Admin to create a new user
router.post('/', verifyJwt, authorizeUser(['Admin']), createUser);

// Allow all authenticated users to get their own user info
router.post(
  '/:id',
  verifyJwt,
  authorizeUser(['Admin', 'Customer', 'Seller']),
  getUser
);

// Only Admin can update or delete users
router.put('/:id', verifyJwt, authorizeUser(['Admin']), updateUser);
router.delete('/:id', verifyJwt, authorizeUser(['Admin']), deleteUser);

export default router;