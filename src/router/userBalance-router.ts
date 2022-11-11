import { validateSchema, verifyToken } from '../middleware/index.js';
import { Router } from 'express';
import {
  createUserBalance,
  getUserBalance,
  modifyUserBalance,
} from '../controller/index.js';
import { findUserByToken } from '../middleware/index.js';
import { balanceSchema, editBalanceSchema } from '../schemas/index.js';

const userBalanceRouter = Router();
userBalanceRouter
  .post(
    '/balance',
    verifyToken(),
    validateSchema(balanceSchema),
    findUserByToken(),
    createUserBalance
  ) //creates userBalance
  .put(
    '/balance',
    verifyToken(),
    validateSchema(editBalanceSchema),
    findUserByToken(),
    modifyUserBalance
  ) //edits userBalance
  .get('/balance', verifyToken(), findUserByToken(), getUserBalance); //gets userBalance

export { userBalanceRouter };
