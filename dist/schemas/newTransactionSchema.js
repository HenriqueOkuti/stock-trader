import Joi from 'joi';
export var newTransactionSchema = Joi.object({
    stockId: Joi.number().greater(0).required()
});
