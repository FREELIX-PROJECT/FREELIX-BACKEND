import { Router } from "express";
import {
    addProject,
    getProject,
    getProjects,
    countProject,
    updateProject,
    deleteProject
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";

const projectRouter = Router();

//Define routes
projectRouter.get('/projects/count', countProject);
projectRouter.post('/projects', isAuthenticated, addProject);
projectRouter.get('/projects', isAuthenticated, getProjects);
projectRouter.get('/projects/:id', getProject);
projectRouter.patch('/projects/:id', isAuthenticated, updateProject);
projectRouter.delete('/projects/:id', isAuthenticated,deleteProject);

//export router
export default projectRouter;