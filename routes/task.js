import { Router } from "express";
import {
    addTask,
    countTasks,
    updateTask,
    deleteTask,
    getTasks,
    getTask
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = Router();

// Define routes
taskRouter.post('/tasks', isAuthenticated, addTask);
taskRouter.get('/tasks/count', isAuthenticated, countTasks);
taskRouter.get('/tasks', isAuthenticated, getTasks);
taskRouter.get('/tasks/:id', isAuthenticated, getTask);
taskRouter.patch('/tasks/:id', isAuthenticated, updateTask);
taskRouter.delete('/tasks/:id', isAuthenticated, deleteTask);

// Export router
export default taskRouter;
