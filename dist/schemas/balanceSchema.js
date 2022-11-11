import Joi from 'joi';
export var balanceSchema = Joi.object({
    balance: Joi.number().min(0).required()
});
export var editBalanceSchema = Joi.object({
    balance: Joi.number().min(0).required()
});
