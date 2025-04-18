import { Router } from 'express';
import auth from '../../middleware/auth.js';
import {
  getAllCustomers,
  addCustomer,
  getCustomerById,
  deleteCustomerById,
  editCustomerById,
} from '../controllers/customerController.js';

const router = Router();

router.get('/customer', auth, getAllCustomers);
router.post('/customer', auth, addCustomer);
router.get('/customer/:id', auth, getCustomerById);
router.put('/customer/:id', auth, editCustomerById);
router.delete('/customer/:id', auth, deleteCustomerById);

export default router;