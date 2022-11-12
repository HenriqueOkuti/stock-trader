import {
  createTransaction,
  findStockInfoById,
  getTransactionsByUserId,
  getTransactionsByUserIdWithArray,
  updateBalanceAfterTransaction,
  validityOfTransaction,
} from '../repository/index.js';
import { Request, Response } from 'express';
import { foundUserInfoType } from '../protocols/index.js';
import httpStatus from 'http-status';

export async function getTransactions(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const stockIds: number[] = ((req.query.stockId as string) || '')
    .split(',')
    .map((str) => (Number(str) ? Number(str) : 0))
    .filter((e) => (e === 0 ? 0 : e));
  try {
    if (!stockIds[0]) {
      const transactions = (await getTransactionsByUserId(userInfo.userId))
        .rows;
      return res.status(httpStatus.OK).send(transactions);
    } else {
      const transactions = (
        await getTransactionsByUserIdWithArray(userInfo.userId, stockIds)
      ).rows;
      return res.status(httpStatus.OK).send(transactions);
    }
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function newTransaction(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const transactionInfo = req.body as transactionInfoType;
  try {
    const stockInfo = (await findStockInfoById(transactionInfo.stockId))
      .rows[0] as stockInfoType;

    if (!stockInfo) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Stock not found' });
    }

    const validityInfo = (
      await validityOfTransaction(userInfo.userId, stockInfo.price)
    ).rows[0] as transactionValidationType;

    if (!validityInfo.isValidTransaction) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: 'Invalid balance for this transaction' });
    }

    await createTransaction(
      userInfo.userId,
      transactionInfo.stockId,
      stockInfo.price
    );

    await updateBalanceAfterTransaction(
      userInfo.userId,
      validityInfo.newBalance
    );

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

type transactionInfoType = {
  stockId: number;
};

type stockInfoType = {
  id: number;
  name: string;
  stockTag: string;
  price: string;
  lastUpdate: object;
};

type transactionValidationType = {
  id: number;
  userId: number;
  newBalance: string;
  isValidTransaction: boolean;
};
