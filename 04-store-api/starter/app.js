import { config } from 'dotenv';
import 'express-async-errors';
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleWare from './middleware/error-handler.js';
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js'
config();

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
});
app.use('/api/v1/products', productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleWare);

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI, console.log('Connected to the DB'));
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
})();  
