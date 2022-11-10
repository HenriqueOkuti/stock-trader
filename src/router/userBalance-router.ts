import { validateSchema, verifyToken } from '../middleware/index.js';
import { Router } from 'express';
import { createUserBalance, getUserBalance } from '../controller/index.js';
import { findUserByToken } from '../middleware/index.js';
import { balanceSchema } from '../schemas/index.js';

const userBalanceRouter = Router();
userBalanceRouter
  .post(
    '/balance',
    verifyToken(),
    validateSchema(balanceSchema),
    findUserByToken(),
    createUserBalance
  ) //creates userBalance
  .put('/balance', verifyToken(), () => {}) //edits userBalance
  .get('/balance', verifyToken(), findUserByToken(), getUserBalance); //gets userBalance

export { userBalanceRouter };
