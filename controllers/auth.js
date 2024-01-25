import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/user.js';

export const registerHandler = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    occupation,
  } = req.body;

  const mergePassword = JSON.stringify({ password, confirmPassword });

  await User.create({
    fullName,
    email,
    phoneNumber,
    password: mergePassword,
    occupation,
  });

  res.status(201).json({
    success: true,
    message: 'Tạo tài khoản thành công',
    code: 2001,
  });
});
