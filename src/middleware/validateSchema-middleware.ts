import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validateSchema(schema: ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const infoToValidate = req.body;
    const { error } = schema.validate(infoToValidate);
    if (error) {
      return res.sendStatus(400);
    } else {
      res.locals.info = infoToValidate;
      next();
    }
  };
}
