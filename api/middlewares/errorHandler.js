import ErrorHandler from '../../utils/ErrorHandler.js';
import objectMapper from '../../utils/objectMapper.js';

const errorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  err.code = err.code || 5000;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log(err);

    res.status(err.status).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = err;

    // Handling Mongoose duplicate key errors
    if (err.name === 'MongoServerError' && err.code === 11000) {
      const keys = Object.keys(err.keyValue);
      const message =
        keys.map((key) => `${objectMapper[key]} đã được sử dụng`) + '';
      error = new ErrorHandler(409, message, 4001);
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((err) => err.message) + '';
      error = new ErrorHandler(422, message, 4002);
    }

    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
      const message = 'Xác thực không thành công. Vui lòng đăng nhập lại';
      error = new ErrorHandler(401, message, 4017);
    }

    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
      const message = 'Xác thực không thành công. Vui lòng đăng nhập lại';
      error = new ErrorHandler(401, message, 4018);
    }

    res.status(error.status).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};

export default errorHandler;
