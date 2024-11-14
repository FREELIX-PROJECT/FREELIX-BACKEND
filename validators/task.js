import Joi from "joi";

export const addTaskValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    assignedTo: Joi.string(),
    hoursLogged: Joi.number()
});


export const updateTaskValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    assignedTo: Joi.string(),
    status: Joi.string(),
    hoursLogged: Joi.number()
});