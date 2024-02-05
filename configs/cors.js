const baseCorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

export const socketCorsOptions = {
  ...baseCorsOptions,
  methods: ['GET', 'POST'],
};

export const apiCorsOptions = {
  ...baseCorsOptions,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
