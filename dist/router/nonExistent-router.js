import { Router } from 'express';
import httpStatus from 'http-status';
var nonExistentRouter = Router();
nonExistentRouter.get('/stock', function (req, res) {
    return res.sendStatus(httpStatus.NOT_FOUND);
});
export { nonExistentRouter };
