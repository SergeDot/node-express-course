import express from "express";
import tasks from './routes/tasks.js';
import connectDB from './db/connect.js';
import { config } from 'dotenv';

config();

const port = 3000;
const app = express();

// middleware
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

// logic
app.get('/hello', (req, res) => {
  res.send('Hello CTD');
});

(async () => {
  try {
    await connectDB(process.env.MONGO_URI, console.log('Connected to the DB'));
    app.listen(port, console.log(`Server is listening to ${port}`));
  } catch (error) {
    console.log(error);
  };
})();
