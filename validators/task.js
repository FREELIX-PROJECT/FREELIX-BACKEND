import Joi from "joi";

export const addTaskValidator = Joi.object({
    description: Joi.string(),
    status: Joi.string()
    // title: Joi.string().required(),
    // assignedTo: Joi.string().required(),
    // hoursLogged: Joi.number()
});


export const updateTaskValidator = Joi.object({
    description: Joi.string(),
    status: Joi.string()
    // title: Joi.string(),
    // assignedTo: Joi.string(),
    // hoursLogged: Joi.number()
});