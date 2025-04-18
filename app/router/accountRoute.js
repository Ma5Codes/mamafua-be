import { Router } from 'express';
import auth from '../../middleware/auth.js';
import { login, register, info } from '../controllers/accountController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/info', auth, info);

export default router;
