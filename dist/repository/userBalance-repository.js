import { db } from '../config/index.js';
export function getUserIdByToken(token) {
    return db.query("select * from sessions where token = $1;", [token]);
}
export function getUserBalanceByUserId(userId) {
    return db.query("select * from \"userBalance\" where \"userId\" = $1", [userId]);
}
export function createNewUserBalance(userId, userBalance) {
    return db.query("insert into \"userBalance\" (\"userId\", balance) values ($1, $2);", [userId, fixDecimals(userBalance.balance)]);
}
export function updateBalance(userId, userBalance) {
    return db.query("\n    update \"userBalance\" \n\t    set balance = $1 \n    where \"userId\" = $2;", [fixDecimals(userBalance.balance), userId]);
}
export function fixDecimals(value) {
    return value.toString().replace('.', ',');
}
