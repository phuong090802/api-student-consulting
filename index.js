import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './api/app.js';
import connectDB from './configs/db.js';
import socket from './socket/index.js';
import { socketCorsOptions } from './configs/cors.js';

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: socketCorsOptions,
});

socket(io);

server.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
