import express from 'express';

import { registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerHandler);

export default router;
