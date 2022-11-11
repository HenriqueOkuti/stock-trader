import { foundUserInfoType, valueBalance } from '../protocols/index.js';
import { Request, Response } from 'express';
import {
  createNewUserBalance,
  getUserBalanceByUserId,
  updateBalance,
} from '../repository/index.js';

export async function getUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  try {
    const userBalance = (await getUserBalanceByUserId(userInfo.userId)).rows[0];
    if (!userBalance) {
      return res.sendStatus(404); // Not found
    }
    return res.status(200).send(userBalance); // OK! + userBalance
  } catch (error) {
    return res.sendStatus(500); //Server error
  }
}

export async function createUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const userBalance = req.body as valueBalance;
  //Quick balance cleanup
  userBalance.balance = +userBalance.balance;
  try {
    await createNewUserBalance(userInfo.userId, userBalance);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.detail); //Server error
  }
}

export async function modifyUserBalance(req: Request, res: Response) {
  const userInfo = res.locals.info as foundUserInfoType;
  const newUserBalance = req.body as valueBalance;

  try {
    await updateBalance(userInfo.userId, newUserBalance);
    return res.sendStatus(200); // OK!
  } catch (error) {
    return res.status(500).send(error.detail); //Server error
  }
}
