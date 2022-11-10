import { valueBalance } from '../protocols/userBalanceType.js';
import { foundUserInfoType } from '../protocols/userInfoType.js';
import { db } from '../config/index.js';

export function getUserIdByToken(token: string) {
  return db.query(`select * from sessions where token = $1;`, [token]);
}

export function getUserBalanceByUserId(userId: number) {
  return db.query(`select * from "userBalance" where "userId" = $1`, [userId]);
}

export function createNewUserBalance(
  userId: number,
  userBalance: valueBalance
) {
  return db.query(
    `insert into "userBalance" ("userId", balance) values ($1, $2);`,
    [userId, userBalance.balance]
  );
}
