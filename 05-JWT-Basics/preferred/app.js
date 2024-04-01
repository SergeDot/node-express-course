import express from 'express';
import { config } from 'dotenv';
import 'express-async-errors';
import mainRouter from './routes/main.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

config();
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1', mainRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

(async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  };
})();
