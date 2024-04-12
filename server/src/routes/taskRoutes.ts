import express from 'express';
import {
    getAllTasks,
    getSpecificTask,
    addTask,
    deleteTask,
    updateTask
} from '../controllers/taskControllers';
import { taskValidationRules } from '../lib/validation';
import requireAuth from '../middleware/requireAuth';

const router = express();

router.use(requireAuth);

router.get('/', getAllTasks);
router.get('/:id', getSpecificTask);
router.post('/', taskValidationRules, addTask);
router.delete('/:id', deleteTask);
router.put('/:id', taskValidationRules, updateTask);

export { router as taskRoutes };
