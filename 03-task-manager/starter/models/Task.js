import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  name: String, completed: Boolean
});

const model = mongoose.model('Task', TaskSchema);

export default model;
