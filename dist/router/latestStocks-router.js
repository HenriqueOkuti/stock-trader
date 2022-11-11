import { Router } from 'express';
import { verifyToken } from '../middleware/index.js';
import { latestStockPrices } from '../controller/index.js';
var latestStocksRouter = Router();
latestStocksRouter.get('/latest', verifyToken(), latestStockPrices); //get latest stocks update
export { latestStocksRouter };
