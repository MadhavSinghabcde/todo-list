// Core deps
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

// Middlewares
import logging from './middleware/logging';
import serverError from './middleware/serverError';

// Routes
import { userRoutes } from './routes/userRoutes';
import { taskRoutes } from './routes/taskRoutes';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logging);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Uncatched error handling
app.use(serverError);

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(+PORT, () => {
            console.log(`Server listening on http://127.0.0.1:${PORT}`)
        })
    })
    .catch(error => console.log(error));

export default app;
