import {
  createNewStock,
  findStockByName,
  getSpecificStock,
  getStocks,
} from '../repository/index.js';
import { Request, Response } from 'express';
import { newStock } from '../protocols/index.js';

export async function fetchStocks(req: Request, res: Response) {
  const specificStockId: number = +req.query.stockId;
  try {
    if (specificStockId) {
      const specificStock = (await getSpecificStock(specificStockId)).rows;
      if (specificStock[0]) {
        return res.status(202).send(specificStock);
      }
    }
    const stocks = (await getStocks()).rows;
    return res.status(202).send(stocks); // OK!
  } catch (error) {
    return res.sendStatus(500); // server error
  }
}

export async function createStock(req: Request, res: Response) {
  const newStock = res.locals.info as newStock;
  try {
    const stockExists = (await findStockByName(newStock.stockName)).rows[0];
    if (stockExists) {
      return res.sendStatus(409); // conflict
    }
    await createNewStock(newStock);
    return res.sendStatus(201); // created
  } catch (error) {
    return res.sendStatus(500); // server error
  }
}
