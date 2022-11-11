import { validateSchema, verifyToken, findUserByToken, } from '../middleware/index.js';
import { Router } from 'express';
import { createUserBalance, getUserBalance, modifyUserBalance, } from '../controller/index.js';
import { balanceSchema, editBalanceSchema } from '../schemas/index.js';
var userBalanceRouter = Router();
userBalanceRouter
    .post('/balance', verifyToken(), validateSchema(balanceSchema), findUserByToken(), createUserBalance)
    .put('/balance', verifyToken(), validateSchema(editBalanceSchema), findUserByToken(), modifyUserBalance)
    .get('/balance', verifyToken(), findUserByToken(), getUserBalance);
export { userBalanceRouter };
