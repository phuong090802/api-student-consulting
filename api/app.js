import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import auth from './routes/auth.js';
import test from './routes/test.js';
import errorHandler from './middlewares/errorHandler.js';
import { apiCorsOptions } from '../configs/cors.js';

const app = express();

app.use(cors(apiCorsOptions));

// for DEV mode

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(
    morgan((tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
      ].join(' - ');
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/test', test);

app.use(errorHandler);

export default app;
