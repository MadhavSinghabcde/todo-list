import mongoose from "mongoose";
const { Schema } = mongoose;

// Type for Typscript
type TaskType = {
    title: string;
    description: string;
    completed: boolean;
    userEmail: string
};

// Type/Schema for MongoDB
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    userEmail: { type: String, required: true }
})

const TaskModel = mongoose.model('Task', TaskSchema);

export { TaskType };
export default TaskModel;
