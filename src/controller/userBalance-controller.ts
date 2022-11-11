import { foundUserInfoType, valueBalance } from '../protocols/index.js';
import { Request, Response } from 'express';
import {
  createNewUserBalance,
  getUserBalanceByUserId,
  updateBalance,
} from '../repository/index.js';
import httpStatus from 'http-status';

export async function getUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  try {
    const userBalance = (await getUserBalanceByUserId(userInfo.userId)).rows[0];
    if (!userBalance) {
      return res.sendStatus(httpStatus.NOT_FOUND); // Not found
    }
    return res.status(httpStatus.OK).send(userBalance); // OK! + userBalance
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR); //Server error
  }
}

export async function createUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const userBalance = req.body as valueBalance;
  //Quick balance cleanup
  userBalance.balance = +userBalance.balance;
  try {
    await createNewUserBalance(userInfo.userId, userBalance);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail); //Server error
  }
}

export async function modifyUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const newUserBalance = req.body as valueBalance;

  try {
    await updateBalance(userInfo.userId, newUserBalance);
    return res.sendStatus(httpStatus.OK); // OK!
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail); //Server error
  }
}
