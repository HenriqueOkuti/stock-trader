import { getUserIdByToken } from '../repository/index.js';
import { Request, Response, NextFunction } from 'express';

export function findUserByToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token: string = res.locals.token;
    const user = (await getUserIdByToken(token)).rows[0];

    if (!user) {
      return res.sendStatus(400);
    } else {
      res.locals.info = user;
      next();
    }
  };
}
