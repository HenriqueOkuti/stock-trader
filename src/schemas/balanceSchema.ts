import Joi from 'joi';

export const balanceSchema = Joi.object({
  balance: Joi.number().min(0).required(),
});

export const editBalanceSchema = Joi.object({
  balance: Joi.number().min(0).required(),
});
