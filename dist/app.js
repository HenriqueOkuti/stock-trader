import express, { json } from 'express';
import cors from 'cors';
import { PORT } from './config/envs.js';
import { authUserRouter, modifyStocksRouter, userBalanceRouter, userTransactionRouter, latestStocksRouter, nonExistentRouter, } from './router/index.js';
var server = express();
server
    .use(cors())
    .use(json())
    .use(authUserRouter)
    .use(modifyStocksRouter)
    .use(userBalanceRouter)
    .use(userTransactionRouter)
    .use(latestStocksRouter)
    .use(nonExistentRouter);
console.clear();
server.listen(PORT, function () { return console.log("Listening on PORT: ".concat(PORT)); });
