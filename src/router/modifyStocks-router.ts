import { Router } from 'express';
import { verifyToken } from '../middleware/index.js';
import { createStock, fetchStocks } from '../controller/index.js';
import { validateSchema } from '../middleware/validateSchema-middleware.js';
import { createStockSchema } from '../schemas/createStockSchema.js';

const modifyStocksRouter = Router();
modifyStocksRouter
  .post('/stock', verifyToken(), validateSchema(createStockSchema), createStock) //new stock
  .put('/stock', verifyToken()) //edit stock
  .get('/stock', verifyToken(), fetchStocks) //get stock
  .delete('/stock', verifyToken()); //delete stock

export { modifyStocksRouter };
