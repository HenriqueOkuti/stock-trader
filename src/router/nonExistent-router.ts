import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';

const nonExistentRouter = Router();
nonExistentRouter.get('*', (req: Request, res: Response) => {
  return res
    .status(httpStatus.NOT_FOUND)
    .send({ message: 'Page does not exist' });
});

export { nonExistentRouter };
