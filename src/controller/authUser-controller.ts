import { userInfoType } from '../protocols/userInfoType.js';
import { insertUser } from '../repository/index.js';
import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response) {
  const userInfo = res.locals.user as userInfoType;

  try {
    console.log(userInfo);
    await insertUser(userInfo);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error.detail);
  }
}
