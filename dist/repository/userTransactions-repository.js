import { db } from '../config/index.js';
export function getTransactionsByUserId(userId) {
    return db.query("select * from \"userStocks\" us where us.\"userId\" = $1;", [
        userId,
    ]);
}
export function getTransactionsByUserIdWithArray(userId, arrayStockIds) {
    return db.query("\n    select * from \"userStocks\" us \n    where \n      us.\"userId\" = $1 and \"stockId\" = ANY($2)", [userId, arrayStockIds]);
}
export function findStockInfoById(stockId) {
    return db.query("select * \n    from \"stocks\" s1 \n    join \"stockInfo\" s2 on s1.id = s2.\"stockId\" \n    where s1.id = $1", [stockId]);
}
export function validityOfTransaction(userId, stockValue) {
    return db.query("\n    select id, \"userId\" , (balance - $2) as \"newBalance\",\n\t    case\n    \t\twhen (balance - $2 >= '0') then true\n\t\t    else false\n\t    end\n\t    as \"isValidTransaction\"\n    from \"userBalance\" ub\n    where \"userId\" = $1\n    ;", [userId, stockValue]);
}
export function createTransaction(userId, stockId, stockPrice) {
    return db.query("\n    insert into \"userStocks\"  (\"userId\", \"stockId\", \"boughtAt\", \"boughtWhen\") values ($1, $2, $3, now());\n  ", [userId, stockId, stockPrice]);
}
export function updateBalanceAfterTransaction(userId, userBalance) {
    return db.query("\n      update \"userBalance\" \n          set balance = $1 \n      where \"userId\" = $2;", [userBalance, userId]);
}
