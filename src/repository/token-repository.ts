import db from '../config/database.js';

export function findSessionByToken(token: string) {
  return db.query(
    `
    select * from sessions where token = $1 and "isValid" = true
    `,
    [token]
  );
}

type sessionType = {
  id: number;
  userId: number;
  token: string;
  createdAt: string;
  isValid: boolean;
};
