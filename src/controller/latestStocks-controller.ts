import { getLatestStockPrices } from '../repository/index.js';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function latestStockPrices(req: Request, res: Response) {
  const stockIds: number[] = ((req.query.stockId as string) || '')
    .split(',')
    .map((str) => (Number(str) ? Number(str) : 0))
    .filter((e) => (e === 0 ? 0 : e));
  try {
    const latestStocks = (await getLatestStockPrices(stockIds)).rows;
    return res.status(httpStatus.OK).send(latestStocks);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
