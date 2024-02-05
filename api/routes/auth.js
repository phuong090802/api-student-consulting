import express from 'express';

import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshTokenHandler,
  registerHandler,
} from '../controllers/auth.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logoutHandler);

router.get('/me', isAuthenticatedUser, meHandler);

export default router;
