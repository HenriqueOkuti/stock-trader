import {
  loginUserType,
  userInfoType,
  foundUserInfoType,
} from '../protocols/index.js';
import {
  createNewSessionByUserId,
  findUserByEmail,
  insertUser,
  invalidatesOldUserSessionByUserId,
} from '../repository/index.js';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

export async function createUser(req: Request, res: Response) {
  const userInfo = res.locals.info as userInfoType;
  try {
    await insertUser(userInfo);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail);
  }
}

export async function logUser(req: Request, res: Response) {
  const userLoginInfo = res.locals.info as loginUserType;
  try {
    const foundUser = await findUserByEmail(userLoginInfo);
    if (!foundUser.rows[0] || foundUser.rows.length > 1) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    const foundUserInfo = foundUser.rows[0] as foundUserInfoType;
    if (bcrypt.compareSync(userLoginInfo.password, foundUserInfo.password)) {
      const token: string = uuid();
      await invalidatesOldUserSessionByUserId(foundUserInfo);
      await createNewSessionByUserId(foundUserInfo, token);
      return res.status(httpStatus.CREATED).send({ token: token });
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.detail);
  }
}
