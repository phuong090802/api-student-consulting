import cors from 'cors';


const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default cors(corsOptions);
