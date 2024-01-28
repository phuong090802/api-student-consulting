import express from 'express';

import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
  userInfoHandler,
} from '../controllers/auth.js';
import authHandler from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logoutHandler);

// outsourcing to const authAllRole = [isAuthenticatedUser, authorizeRoles('USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN')]
// then router.use(authAllRole)
router.use(authHandler('USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN'));
router.post('/user-info', userInfoHandler);

export default router;
