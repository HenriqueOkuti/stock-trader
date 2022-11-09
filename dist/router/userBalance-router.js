import { Router } from 'express';
var userBalanceRouter = Router();
userBalanceRouter
    .post('/balance', function () { }) //creates userBalance
    .put('/balance', function () { }) //edits userBalance
    .get('/balance', function () { }) //gets userBalance
;
export { userBalanceRouter };
