import Joi from "joi";

export const addprojectValidator = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        client: Joi.string().required(),//not ref yet
        freelancer: Joi.string().required(),// yet to ref
        status: Joi.string().valid('open', 'in-progress', 'completed', 'closed').default('open'),
        budget: Joi.number().required(),
        deadline: Joi.date().optional()
});


export const updateprojectValidator = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        client: Joi.string(), //not ref yet
        freelancer: Joi.string(),// yet to ref
        status: Joi.string().valid('open', 'in-progress', 'completed', 'closed').default('open'),
        budget: Joi.number(),
        deadline: Joi.date()
});