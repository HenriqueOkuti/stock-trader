import { verifyToken, findUserByToken } from '../middleware/index.js';
import { Router } from 'express';
import { getTransactions, newTransaction } from '../controller/index.js';
var userTransactionRouter = Router();
userTransactionRouter
    .post('/transaction', verifyToken(), findUserByToken(), newTransaction)
    .get('/transaction', verifyToken(), findUserByToken(), getTransactions);
export { userTransactionRouter };
