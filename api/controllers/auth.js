import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../../models/user.js';
import ErrorHandler from '../../utils/ErrorHandler.js';
import { sendToken, clearToken } from '../../utils/token.js';
import RefreshToken from '../../models/refreshToken.js';

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

export const loginHandler = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new ErrorHandler(400, 'Vui lòng nhập tên đăng nhập và mật khẩu', 4006)
    );
  }
  const user = await User.findOne({ phoneNumber: username }).select(
    '+password'
  );
  if (!user) {
    return next(
      new ErrorHandler(
        401,
        'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
        4007
      )
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        401,
        'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
        4008
      )
    );
  }

  if (!user.isEnabled) {
    return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4012));
  }

  const token = user.generateAuthToken();
  const refreshToken = await user.generateRefreshToken();
  const userInfo = await user.getUserInfo();

  sendToken(res, token, refreshToken, userInfo);
});

export const refreshTokenHandler = catchAsyncErrors(async (req, res, next) => {
  // string
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4009));
  }

  // object
  const token = await RefreshToken.findOne({ token: refreshToken });

  if (!token) {
    clearToken(res);
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4010));
  }

  if (!token.status) {
    // delete all token in branch
    await RefreshToken.deleteMany({ branch: token.branch });
    clearToken(res);
    return next(new ErrorHandler(400, 'Yêu cầu không hợp lệ', 4011));
  }

  const user = await User.findById(token.owner);

  if (!user) {
    return next(new ErrorHandler(401, 'Không tìm thấy tài khoản', 4013));
  }

  if (!user.isEnabled) {
    return next(new ErrorHandler(403, 'Tài khoản đã bị khóa', 4014));
  }

  const newToken = user.generateAuthToken();
  const newRefreshToken = await token.generateRefreshToken();
  const userInfo = await user.getUserInfo();
  sendToken(res, newToken, newRefreshToken, userInfo);
});

export const logoutHandler = catchAsyncErrors(async (req, res, next) => {
  // string
  const { refreshToken } = req.cookies;

  // object
  const token = await RefreshToken.findOne({ token: refreshToken });

  await RefreshToken.deleteMany({ branch: token.branch });

  clearToken(res);

  res.json({
    success: true,
    message: 'Đăng xuất thành công',
    code: 2004,
  });
});

export const userInfoHandler = catchAsyncErrors(async (req, res, next) => {
  const user = await req.user.getUserInfo();
  res.json({
    success: true,
    user,
    code: 2005,
  });
});
