import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import httpStatus from 'http-status';

export function validateSchema(schema: ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const infoToValidate = req.body;
    const { error } = schema.validate(infoToValidate);
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(error.details.map((e) => e.message));
    } else {
      res.locals.info = infoToValidate;
      next();
    }
  };
}
