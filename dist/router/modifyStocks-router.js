import { Router } from 'express';
import { verifyToken } from '../middleware/index.js';
import { createStock, deleteStock, editStock, fetchStocks, } from '../controller/index.js';
import { validateSchema } from '../middleware/index.js';
import { createStockSchema, editStockSchema } from '../schemas/index.js';
var modifyStocksRouter = Router();
modifyStocksRouter
    .post('/stock', verifyToken(), validateSchema(createStockSchema), createStock)
    .put('/stock', verifyToken(), validateSchema(editStockSchema), editStock)
    .get('/stock', verifyToken(), fetchStocks)["delete"]('/stock', verifyToken(), deleteStock);
export { modifyStocksRouter };
