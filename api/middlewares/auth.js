import jwt from 'jsonwebtoken';

import User from '../../models/user.js';
import catchAsyncErrors from './catchAsyncErrors.js';
import ErrorHandler from '../../utils/ErrorHandler.js';

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new ErrorHandler(
        401,
        'Đăng nhập trước khi truy cập vào tài nguyên này',
        4015
      )
    );
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (!roles.includes(role)) {
      return next(
        new ErrorHandler(
          403,
          `Role (${role}) không được phép truy cập vào tài nguyên này`,
          4016
        )
      );
    }
    next();
  };
};

const authHandler = (...roles) => [
  isAuthenticatedUser,
  authorizeRoles(...roles),
];
export default authHandler;
