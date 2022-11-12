import Joi from 'joi';

export const newTransactionSchema = Joi.object({
  stockId: Joi.number().greater(0).required(),
});
