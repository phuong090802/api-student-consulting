import 'dotenv/config';
import app from './app.js';
import connectDB from './configs/db.js';

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
