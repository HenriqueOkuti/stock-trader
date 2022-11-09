import {
  loginUserType,
  userInfoType,
  foundUserInfoType,
} from '../protocols/userInfoType.js';
import {
  createNewSessionByUserId,
  findUserByEmail,
  insertUser,
  invalidatesOldUserSessionByUserId,
} from '../repository/index.js';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function createUser(req: Request, res: Response) {
  const userInfo = res.locals.info as userInfoType;

  try {
    await insertUser(userInfo);
    return res.sendStatus(201); //created
  } catch (error) {
    return res.status(500).send(error.detail); //server error
  }
}

export async function logUser(req: Request, res: Response) {
  const userLoginInfo = res.locals.info as loginUserType;

  try {
    const foundUser = await findUserByEmail(userLoginInfo);
    if (!foundUser.rows[0] || foundUser.rows.length > 1) {
      return res.sendStatus(404);
    }
    const foundUserInfo = foundUser.rows[0] as foundUserInfoType;
    if (bcrypt.compareSync(userLoginInfo.password, foundUserInfo.password)) {
      const token: string = uuid();
      await invalidatesOldUserSessionByUserId(foundUserInfo);
      await createNewSessionByUserId(foundUserInfo, token);
      return res.status(201).send({ token: token }); //created + token
    } else {
      return res.sendStatus(401); //unauthorized
    }
  } catch (error) {
    return res.status(500).send(error.detail); //server error
  }
}
