import { Router } from 'express';

const userTransactionRouter = Router();
userTransactionRouter
  .post('/transaction', () => {}) //new transaction
  .put('/transaction', () => {}) //edit transaction
  .get('/transaction', () => {}) //get transaction
  .delete('/transaction', () => {}); //delete transaction

export { userTransactionRouter };
