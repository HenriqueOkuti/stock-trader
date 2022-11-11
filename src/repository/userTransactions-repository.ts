import { db } from '../config/index.js';

export function getTransactionsByUserId(userId: number) {
  return db.query(`select * from "userStocks" us where us."userId" = $1;`, [
    userId,
  ]);
}

export function getTransactionsByUserIdWithArray(
  userId: number,
  arrayStockIds: number[]
) {
  return db.query(
    `
    select * from "userStocks" us 
    where 
      us."userId" = $1 and "stockId" = ANY($2)`,
    [userId, arrayStockIds]
  );
}

export function findStockInfoById(stockId: number) {
  return db.query(
    `select * 
    from "stocks" s1 
    join "stockInfo" s2 on s1.id = s2."stockId" 
    where s1.id = $1`,
    [stockId]
  );
}

export function validityOfTransaction(userId: number, stockValue: string) {
  return db.query(
    `
    select id, "userId" , (balance - $2) as "newBalance",
	    case
    		when (balance - $2 >= '0') then true
		    else false
	    end
	    as "isValidTransaction"
    from "userBalance" ub
    where "userId" = $1
    ;`,
    [userId, stockValue]
  );
}

export function createTransaction(
  userId: number,
  stockId: number,
  stockPrice: string
) {
  return db.query(
    `
    insert into "userStocks"  ("userId", "stockId", "boughtAt", "boughtWhen") values ($1, $2, $3, now());
  `,
    [userId, stockId, stockPrice]
  );
}

export function updateBalanceAfterTransaction(
  userId: number,
  userBalance: string
) {
  return db.query(
    `
      update "userBalance" 
          set balance = $1 
      where "userId" = $2;`,
    [userBalance, userId]
  );
}
