import { registerHandler } from './controllers/auth.js';

export default function socket(io) {
  const authNamespace = io.of('/auth', (socket) => {
    registerHandler(authNamespace, socket);
  });
}
