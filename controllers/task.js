import { TaskModel } from "../models/task.js";
import { addTaskValidator, updateTaskValidator } from "../validators/task.js";
import { mailTransporter } from "../utils/mail.js";

export const addTask = async (req, res, next)=>{
    try {
        const {error, value} = addTaskValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //add task to database
        const newTask = await TaskModel.create({
            ...value,
            user:req.auth.id
        });
        //send a reminder or notification
        //response to request
        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
}


export const countTasks = async (req, res, next)=>{
    try {
         const {filter = "{}"} = req.query; 
         const taskFilter ={...JSON.parse(filter),
            user: req.auth.id};
            //count tasks in the database
            const count = await TaskModel.countDocuments(taskFilter);
            //respond to request
            res.json({count})
    } catch (error) {
        next(error);
    }
}



export const updateTask = (req, res, next)=>{
    try {
        const {error, value} = updateTaskValidator.validate(req.body);
        if (error) {
            return res.status(404).json("")
        }
    } catch (error) {
        next(error);
    }
}

export const deleteTask =()=>{}

export const getTasks = ()=>{}

export const getTask = ()=>{}