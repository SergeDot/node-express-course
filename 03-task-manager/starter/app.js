import express from "express";
import tasks from './routes/tasks.js';
import connectDB from './db/connect.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import { config } from 'dotenv';

config();

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

(async () => {
  try {
    await connectDB(process.env.MONGO_URI, console.log('Connected to the DB'));
    app.listen(port, console.log(`Server is listening to ${port}`));
  } catch (error) {
    console.log(error);
  };
})();
