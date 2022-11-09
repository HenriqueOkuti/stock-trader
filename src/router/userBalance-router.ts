import { Router } from 'express';

const userBalanceRouter = Router();
userBalanceRouter
    .post('/balance', () => {}) //creates userBalance
    .put('/balance', () => {})  //edits userBalance
    .get('/balance', () => {})  //gets userBalance
    ;


export {userBalanceRouter};   