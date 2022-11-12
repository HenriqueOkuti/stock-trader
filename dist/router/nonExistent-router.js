import { Router } from 'express';
import httpStatus from 'http-status';
var nonExistentRouter = Router();
nonExistentRouter.get('*', function (req, res) {
    return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Page does not exist' });
});
export { nonExistentRouter };
