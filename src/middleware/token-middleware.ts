import { findSessionByToken } from '../repository/index.js';
import { Request, Response, NextFunction } from 'express';
import { tokenSchema } from '../schemas/index.js';
import httpStatus from 'http-status';

export function verifyToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken: string = req.headers.authorization.replace(
      'Bearer ',
      ''
    );

    //token validation: format
    const { error } = tokenSchema.validate(authorizationToken);
    if (error) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    //token validation: is it valid?
    const isSessionValid = (await findSessionByToken(authorizationToken))
      .rows[0];

    if (!isSessionValid) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    res.locals.token = authorizationToken;
    next();
  };
}
