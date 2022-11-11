import httpStatus from 'http-status';
export function validateSchema(schema) {
    return function (req, res, next) {
        var infoToValidate = req.body;
        var error = schema.validate(infoToValidate).error;
        if (error) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        else {
            res.locals.info = infoToValidate;
            next();
        }
    };
}
