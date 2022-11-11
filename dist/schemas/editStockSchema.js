import Joi from 'joi';
export var editStockSchema = Joi.object({
    id: Joi.number().greater(0).required(),
    stockName: Joi.string().min(3).required(),
    stockTag: Joi.string().length(3).uppercase().required()
});
