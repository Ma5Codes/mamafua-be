import { Router } from 'express';
import auth from '../../middleware/auth.js';
import { getAllActivities } from '../controllers/activityController.js';

const router = Router();

router.get('/activities', auth, getAllActivities);

export default router;