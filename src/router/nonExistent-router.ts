import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';

const nonExistentRouter = Router();
nonExistentRouter.get('/stock', (req: Request, res: Response) => {
  return res.sendStatus(httpStatus.NOT_FOUND);
});

export { nonExistentRouter };
