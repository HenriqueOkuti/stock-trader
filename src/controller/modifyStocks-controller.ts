import {
  createNewStock,
  deleteStockById,
  editStockById,
  findStockById,
  findStockByName,
  getSpecificStock,
  getStocks,
} from '../repository/index.js';
import { Request, Response } from 'express';
import { editStockType, newStockType, stockType } from '../protocols/index.js';
import httpStatus from 'http-status';

export async function fetchStocks(req: Request, res: Response) {
  const specificStockId: number = +req.query.stockId;
  try {
    if (specificStockId) {
      const specificStock = (await getSpecificStock(specificStockId)).rows;
      if (specificStock[0]) {
        return res.status(httpStatus.ACCEPTED).send(specificStock);
      }
    }
    const stocks = (await getStocks()).rows;
    return res.status(httpStatus.ACCEPTED).send(stocks);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createStock(req: Request, res: Response) {
  const newStock = res.locals.info as newStockType;
  try {
    const stockExists = (await findStockByName(newStock.stockName)).rows[0];
    if (stockExists) {
      return res
        .status(httpStatus.CONFLICT)
        .send({ message: 'Stock name already in use' });
    }
    await createNewStock(newStock);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail);
  }
}

export async function editStock(req: Request, res: Response) {
  const editedStock = res.locals.info as editStockType;
  try {
    const stockExists = (await findStockById(editedStock.id))
      .rows[0] as stockType;
    if (!stockExists) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (verifyNameAndTag(stockExists, editedStock)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    await editStockById(editedStock);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail);
  }
}

function verifyNameAndTag(obj1: stockType, obj2: editStockType): boolean {
  if (obj1.name === obj2.stockName && obj1.stockTag === obj2.stockTag) {
    return true;
  }
  return false;
}

export async function deleteStock(req: Request, res: Response) {
  const stockId: number = req.body.id;
  try {
    await deleteStockById(stockId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
