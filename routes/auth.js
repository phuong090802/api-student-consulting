import express from 'express';

import { registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.get('/register', registerHandler);

export default router;
