import { Request, Response } from 'express';
import  TaskModel from '../models/task';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

const getAllTasks = async (req: Request, res: Response) => {
    const email = req.email;
    const userTasks = await TaskModel.find({ userEmail: email });

    // CHECK: Try this later and implement with client
    // if (userTasks.length === 0) {
    //     res.status(404).send({ error: 'No workouts found' });
    // }

    res.send(userTasks);
}

const getSpecificTask = async (req: Request, res: Response) => {
    const email = req.email;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    const task = await TaskModel.findOne({ _id: id, userEmail: email })

    if (!task) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    res.send(task);
}

const addTask = async (req: Request, res: Response) => {
    const email = req.email;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    // CHEKC: Fix value of completed
    // Either have it opt out from validation rules
    // Or have a dynamic value for the completed field
    const newTaskValues = {
        ...req.body,
        userEmail: email
    }

    const newTask = await TaskModel.create(newTaskValues);

    if (!newTask) {
        res.status(400).send({ error: "Error occured adding task" });
    }

    res.send(newTask);
}

const deleteTask = async (req: Request, res: Response) => {
    const email = req.email;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    const deletedTask = await TaskModel.findOneAndDelete({ _id: id, userEmail: email });

    if (!deletedTask) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    res.send(deletedTask);
}

const updateTask = async (req: Request, res: Response) => {
    const email = req.email;
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ erorr: errors.array() });
    }

    if (!mongoose.Types.ObjectId.isValid) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    const updateTaskValues = {
        ...req.body,
        userEmail: email
    };

    const updatedTask = await TaskModel.findOneAndUpdate(
        { _id: id, userEmail: email },
        updateTaskValues
    )

    if (!updatedTask) {
        const error = "Task not found. Invalid task id";
        return res.status(404).send({ error });
    }

    res.send(updatedTask);
}

export {
    getAllTasks,
    getSpecificTask,
    addTask,
    deleteTask,
    updateTask
}
