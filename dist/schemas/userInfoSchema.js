import Joi from 'joi';
export var createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
});
export var loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
});
