import { Router } from 'express';

const modifyStocksRouter = Router();
modifyStocksRouter
  .post('/stock', () => {}) //new stock
  .put('/stock', () => {}) //edit stock
  .get('/stock', () => {}) //get stock
  .delete('/stock', () => {}); //delete stock

export { modifyStocksRouter };
