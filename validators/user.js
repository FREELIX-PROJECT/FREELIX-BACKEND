import Joi from "joi";

export const registerUserValidator = Joi.object({
    fullName: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),

    confirmPassword: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'Passwords do not match' }),
    
})

// .with('password', 'repeat_password');


export const loginUserValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

export const updateUserValidator = Joi.object({
    fullName: Joi.string(),
    avatar: Joi.string(),
});
