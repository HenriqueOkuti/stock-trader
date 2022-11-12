import { db } from '../config/index.js';

export function findSessionByToken(token: string) {
  return db.query(
    `
    select * from sessions where token = $1 and "isValid" = true
    `,
    [token]
  );
}
