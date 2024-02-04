import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './api/app.js';
import connectDB from './configs/db.js';
import socket from './socket/index.js';
import corsOptions from './configs/cors.js';

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['polling', 'websocket'],
});

socket(io);

server.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
