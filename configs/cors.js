import ErrorHandler from '../utils/ErrorHandler.js';

const WHITE_LIST = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (WHITE_LIST.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new ErrorHandler(403, 'Not allowed by CORS', 4019));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
