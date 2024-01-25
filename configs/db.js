import mongoose from 'mongoose';

export default function connectDB() {
  let DB_URI = '';
  if (process.env.NODE_ENV === 'DEVELOPMENT') DB_URI = process.env.DB_LOCAL_URI;
  if (process.env.NODE_ENV === 'PRODUCTION') DB_URI = process.env.DB_URI;
  // thêm cấu hình strictQuery
  mongoose.set('strictQuery', true);

  mongoose
    .connect(DB_URI)
    .then((conn) => {
      console.log(`MongoDB connected with HOST: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`When connecting to MongoDB, an error occurred: ${err}`);
      process.exit(1);
    });
}
