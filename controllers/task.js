import { TaskModel } from "../models/task.js";
import { addTaskValidator, updateTaskValidator } from "../validators/task.js";
import { mailTransporter } from "../utils/mail.js";
import { UserModel } from "../models/user.js";



export const addTask = async (req, res, next) => {
    try {
        const { error, value } = addTaskValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //add task to database
        const newTask = await TaskModel.create({
            ...value,
            user: req.auth.id
        });
        //send a reminder or notification

        // const addTaskTime = new Date().toLocaleString();
        // await mailTransporter.sendMail({
        //     to: req.auth.id,
        //     subject: "Task added successfully",
        //     text: `You have added: ${value.title} as a task at ${addTaskTime}`
        // })

        //response to request
            
        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
}


export const countTasks = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        const taskFilter = {
            ...JSON.parse(filter),
            user: req.auth.id
        };
        //count tasks in the database
        const count = await TaskModel.countDocuments(taskFilter);
        //respond to request
        res.json({ count })
    } catch (error) {
        next(error);
    }
}



export const updateTask = async (req, res, next) => {
    try {
        const { error, value } = updateTaskValidator.validate(req.body);
        if (error) {
            return res.status(404).json("Validation Error");
        }
        const updateTask = await TaskModel.findByIdAndUpdate(
            { _id: req.params.id, user: req.auth.id },
            { ...value },
            { new: true }
        );
        if (!updateTask) {

            return res.status(404).json("Update wasn't successful");
        }
        return res.status(200).json("Task updated");

           return  res.status(404).json("Update wasn't successful");
        }
        return res.status(200).json("Ticket updated", updateTask);

    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findOneAndDelete(req.body.id);

        // Check if the task was found and deleted
        if (!deletedTask) {
            return res.status(404).json("Task not found.");
        }

        // Respond with a success message
        res.json("Task Successfully deleted ")
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;

        // Fetch Tasks from database

        const { filter = "{}", sort = "{}", limit = 0, skip = 0 } = req.query;
        
        const tasks = await TaskModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
            // {user: req.auth.id};
        // Return response
        return res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTask = async (req, res, next) => {
    try {
        //get ticket by id from database
        const ticket = await TaskModel.findById(req.params.id);
        //respond  to request
        res.json(ticket);
    } catch (error) {
        next(error);
    }
};