import express from 'express';
import { logon, welcomeMessage } from '../controllers/main.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/logon').post(logon);
router.route('/hello').get(authMiddleware, welcomeMessage);

export default router;
