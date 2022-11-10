import { findSessionByToken } from '../repository/index.js';
import { Request, Response, NextFunction } from 'express';
import { tokenSchema } from '../schemas/index.js';

export function verifyToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken: string = req.headers.authorization.replace(
      'Bearer ',
      ''
    );

    //token validation: format
    const { error } = tokenSchema.validate(authorizationToken);
    if (error) {
      return res.sendStatus(400);
    }

    //token validation: is it valid?
    const isSessionValid = (await findSessionByToken(authorizationToken))
      .rows[0];

    if (!isSessionValid) {
      return res.sendStatus(401);
    }

    res.locals.token = authorizationToken;
    next();
  };
}
