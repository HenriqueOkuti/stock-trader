import Joi from 'joi';
export var createStockSchema = Joi.object({
    stockName: Joi.string().min(3).required(),
    stockTag: Joi.string().length(3).uppercase().required(),
    price: Joi.number().greater(0).required()
});
