import Joi from "joi";

export const addTaskValidator = Joi.object({
    description: Joi.string(),
    status: Joi.string()
});


export const updateTaskValidator = Joi.object({
    description: Joi.string(),
    status: Joi.string()
});