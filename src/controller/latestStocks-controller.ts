import { getLatestStockPrices } from '../repository/index.js';
import { Request, Response } from 'express';

export async function latestStockPrices(req: Request, res: Response) {
  const stockIds: number[] = ((req.query.stockId as string) || '')
    .split(',')
    .map((str) => (Number(str) ? Number(str) : 0))
    .filter((e) => (e === 0 ? 0 : e));
  try {
    const latestStocks = (await getLatestStockPrices(stockIds)).rows;
    return res.status(200).send(latestStocks); // OK!
  } catch (error) {
    return res.sendStatus(500); // Server error
  }
}
