import express, { json } from 'express';
import cors from 'cors';
import { PORT } from './config/envs.js';
import {
  authUserRouter,
  modifyStocksRouter,
  userBalanceRouter,
  userTransactionRouter,
  latestStocksRouter,
} from './router/index.js';

const server = express();
server
  .use(cors())
  .use(json())
  .use(authUserRouter)
  .use(modifyStocksRouter)
  .use(userBalanceRouter)
  .use(userTransactionRouter)
  .use(latestStocksRouter);

console.clear();
server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
