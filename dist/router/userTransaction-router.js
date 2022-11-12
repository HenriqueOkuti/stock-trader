import { verifyToken, findUserByToken, validateSchema, } from '../middleware/index.js';
import { Router } from 'express';
import { getTransactions, newTransaction } from '../controller/index.js';
import { newTransactionSchema } from '../schemas/index.js';
var userTransactionRouter = Router();
userTransactionRouter
    .post('/transaction', verifyToken(), validateSchema(newTransactionSchema), findUserByToken(), newTransaction)
    .get('/transaction', verifyToken(), findUserByToken(), getTransactions);
export { userTransactionRouter };
