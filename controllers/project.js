import { ProjectModel, } from "../models/project.js";
import { addProjectValidator, updateProjectValidator } from "../validators/project.js";


export const addProject = async (req, res, next) => {
    try {
        const { error, value } = addProjectValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // write Project to database
        const newProject = await ProjectModel.create({
            ...value,
            user: req.auth.id,
        });
        //respond to request
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 0, skip = 0 } = req.query;
        // const taskFilter = { user: req.auth.id };
        // Fetch task from database
        const task = await ProjectModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
            .populate('freelancer', 'fullName');
        // Return response
        return res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const countProject = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        const projectFilter = { ...JSON.parse(filter), user: req.auth.id };
        // count Projects in database
        const count = await ProjectModel.countDocuments(projectFilter);
        //respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
};

export const getProject = async (req, res, next) => {
    try {
        //get Project by id from database
        const Project = await ProjectModel.findById(req.params.id).populate('freelancer', 'fullName');
        //respond  to request
        res.json(Project);
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const { error, value } = updateProjectValidator.validate(req.body);
        if (error) {
            return res.status(404).json("No data to update");
        }
        const updateProject = await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id, user: req.auth.id },
            { ...req.body },
            { new: true }
        );
        if (!updateProject) {
            return res.status(404).json("Update wasn't successful");
        }
        res.status(200).json("Project updated");
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

        // Check if the Project was found and deleted
        if (!deletedProject) {
            return res.status(404).json("Project not found.");
        }
        // Respond with a success message
        res.json("Project deleted!");
    } catch (error) {
        next(error);
    }
};