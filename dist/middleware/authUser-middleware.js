import { createUserSchema } from '../schemas/index.js';
export function validateNewUser(req, res, next) {
    var userInfo = req.body;
    var error = createUserSchema.validate(userInfo).error;
    if (error) {
        return res.status(402).send(error.details.map(function (e) { return e.message; }));
    }
    else {
        res.locals.user = userInfo;
        next();
    }
}
//DEPRECATED
