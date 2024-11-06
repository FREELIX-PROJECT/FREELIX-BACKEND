import Joi from "joi";

export const addProjectValidator = Joi.object({
        projectName: Joi.string().required(),
        clientName: Joi.string().required(),
        projectBegins: Joi.date().optional(),
        projectDeadline: Joi.date().optional(),
        projectBudget: Joi.number().required(),
        description: Joi.string().required(),
        freelancer: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(), // ObjectId validation pattern
        status: Joi.string().valid('open', 'in-progress', 'completed', 'closed').default('open')
});

export const updateProjectValidator = Joi.object({
        projectName: Joi.string(),
        clientName: Joi.string(),
        projectBegins: Joi.date(),
        projectDeadline: Joi.date(),
        projectBudget: Joi.number(),
        description: Joi.string(),
        freelancer: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
        status: Joi.string().valid('open', 'in-progress', 'completed', 'closed')
});
