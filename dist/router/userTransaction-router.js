import { Router } from 'express';
var userTransactionRouter = Router();
userTransactionRouter
    .post('/transaction', function () { }) //new transaction
    .put('/transaction', function () { }) //edit transaction
    .get('/transaction', function () { }) //get transaction
["delete"]('/transaction', function () { }) //delete transaction
;
export { userTransactionRouter };
