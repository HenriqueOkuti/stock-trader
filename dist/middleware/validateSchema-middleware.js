import httpStatus from 'http-status';
export function validateSchema(schema) {
    return function (req, res, next) {
        var infoToValidate = req.body;
        var error = schema.validate(infoToValidate).error;
        if (error) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .send(error.details.map(function (e) { return e.message; }));
        }
        else {
            res.locals.info = infoToValidate;
            next();
        }
    };
}
