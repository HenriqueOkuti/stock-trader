import Joi from 'joi';

export const createStockSchema = Joi.object({
  stockName: Joi.string().min(3).required(),
  stockTag: Joi.string().length(3).uppercase().required(),
  price: Joi.number().greater(0).required(),
});
