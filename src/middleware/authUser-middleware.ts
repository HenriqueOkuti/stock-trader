import { userInfoType } from '../protocols/userInfoType.js';
import { Request, Response, NextFunction } from 'express';
import { createUserSchema } from '../schemas/userInfoSchema.js';

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
