import Joi from 'joi';

export const balanceSchema = Joi.object({
  balance: Joi.number().min(0).required(),
});
