import { verifyToken, findUserByToken } from '../middleware/index.js';
import { Router } from 'express';
import { getTransactions, newTransaction } from '../controller/index.js';
var userTransactionRouter = Router();
userTransactionRouter
    .post('/transaction', verifyToken(), findUserByToken(), newTransaction) //new transaction
    .get('/transaction', verifyToken(), findUserByToken(), getTransactions); //get transaction
export { userTransactionRouter };
