import { db } from '../config/index.js';
export function findSessionByToken(token) {
    return db.query("\n    select * from sessions where token = $1 and \"isValid\" = true\n    ", [token]);
}
