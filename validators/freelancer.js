import Joi from "joi";

export const addFreelancerValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('freelancer','client').default('freelancer').required(),
    profilePicture: Joi.string().uri().optional(),  // Expecting a URL if provided
    bio: Joi.string(),  // Set a reasonable max length for bio
    skills: Joi.array().items(Joi.string()).optional(),
    hourlyRate: Joi.number().min(0).optional()
});

export const updateFreelancerValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    role: Joi.string().valid('freelancer','client').default('freelancer'),
    profilePicture: Joi.string().uri().optional(),
    bio: Joi.string(),
    skills: Joi.array().items(Joi.string()).optional(),
    hourlyRate: Joi.number().min(0).optional()
});

