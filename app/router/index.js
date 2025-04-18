import { Router } from 'express';
import account from './accountRoute.js';
import transaction from './transactionRoute.js';
import customer from './customerRoute.js';
import activity from './activityRoute.js';

const router = Router();

// Check if the API is running
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running',
  });
});

// Correctly map routes with consistent prefixes
router.use('/auth', account);
router.use('/transactions', transaction);
router.use('/customers', customer);
router.use('/activities', activity);

export default router;