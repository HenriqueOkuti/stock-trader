import { Router } from 'express';
import { verifyToken } from '../middleware/index.js';
import {
  createStock,
  deleteStock,
  editStock,
  fetchStocks,
} from '../controller/index.js';
import { validateSchema } from '../middleware/index.js';
import { createStockSchema, editStockSchema } from '../schemas/index.js';

const modifyStocksRouter = Router();
modifyStocksRouter
  .post('/stock', verifyToken(), validateSchema(createStockSchema), createStock) //new stock
  .put('/stock', verifyToken(), validateSchema(editStockSchema), editStock) //edit stock
  .get('/stock', verifyToken(), fetchStocks) //get stock
  .delete('/stock', verifyToken(), deleteStock); //delete stock

export { modifyStocksRouter };
