import { Router } from 'express';
var modifyStocksRouter = Router();
modifyStocksRouter
    .post('/stock', function () { }) //new stock
    .put('/stock', function () { }) //edit stock
    .get('/stock', function () { }) //get stock
["delete"]('/stock', function () { }) //delete stock
;
export { modifyStocksRouter };
