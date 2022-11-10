import { userInfoType } from '../protocols/index.js';
import { Request, Response, NextFunction } from 'express';
import { createUserSchema } from '../schemas/index.js';

export function validateNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = req.body as userInfoType;
  const { error } = createUserSchema.validate(userInfo);
  if (error) {
    return res.status(402).send(error.details.map((e) => e.message));
  } else {
    res.locals.user = userInfo;
    next();
  }
}

//DEPRECATED
