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
  const newStock = res.locals.info as newStockType;
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

export async function editStock(req: Request, res: Response) {
  const editedStock = res.locals.info as editStockType;
  try {
    const stockExists = (await findStockById(editedStock.id))
      .rows[0] as stockType;
    if (!stockExists) {
      return res.sendStatus(404); //  not found
    }
    if (verifyNameAndTag(stockExists, editedStock)) {
      return res.sendStatus(400); // bad request
    }
    await editStockById(editedStock);
    return res.sendStatus(200); // OK!
  } catch (error) {
    return res.status(500).send(error.detail); // server error
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
    return res.sendStatus(200); // OK!
  } catch (error) {
    return res.sendStatus(500); // server error
  }
}
