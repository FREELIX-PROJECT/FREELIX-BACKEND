import Joi from "joi";

export const registerUserValidator = Joi.object({
    fullName: Joi.string()
        .required(),

    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new ReqExp('^[a-zA-Z0-0]{3,30}$')),

    repeat_password: Joi.ref('password'),
})

    .with('password', 'repeat_password');


export const loginUserValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

export const updateUserValidator = Joi.object({
    userName: Joi.string(),
    avatar: Joi.string(),
});
