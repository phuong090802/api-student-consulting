import express from 'express';
import morgan from 'morgan';

import auth from './routes/auth.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
    ].join(' - ');
  })
);

app.use('/api/auth', auth);

app.use(errorHandler);

export default app;
