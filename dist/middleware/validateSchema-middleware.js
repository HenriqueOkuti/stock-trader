export function validateSchema(schema) {
    return function (req, res, next) {
        var infoToValidate = req.body;
        var error = schema.validate(infoToValidate).error;
        if (error) {
            return res.sendStatus(400);
        }
        else {
            res.locals.info = infoToValidate;
            next();
        }
    };
}
