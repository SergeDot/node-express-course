import express from "express";
import { getAll, createTask, getTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(createTask);

router
  .route('/:id')
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

export default router;
