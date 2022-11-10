import { db } from '../config/index.js';
import {
  foundUserInfoType,
  loginUserType,
  userInfoType,
} from '../protocols/index.js';
import bcrypt from 'bcrypt';
import { SALT } from '../enums/index.js';

export function insertUser(user: userInfoType) {
  const passwordHash: string = bcrypt.hashSync(user.password, SALT);
  return db.query(
    `insert into users (name, "email", "password") values ($1, $2, $3);`,
    [user.name, user.email, passwordHash]
  );
}

export function findUserByEmail(user: loginUserType) {
  return db.query(`select * from users where email = $1;`, [user.email]);
}

export async function invalidatesOldUserSessionByUserId(
  user: foundUserInfoType
) {
  const idSessions: sessionType[] = (
    await db.query(`select * from sessions where "userId" = $1;`, [user.id])
  ).rows;

  if (!idSessions[0]) {
    return;
  }

  for (let i = 0; i < idSessions.length; i++) {
    await db.query(
      `
    update sessions
    set "isValid" = false
    where id = $1
    ;`,
      [idSessions[i].id]
    );
  }

  return;
}

export async function createNewSessionByUserId(
  user: foundUserInfoType,
  token: string
) {
  await db.query(
    `
  insert into sessions ("userId", token, "createdAt", "isValid") 
  values ($1, $2, now(), true);
  `,
    [user.id, token]
  );
  return;
}

type sessionType = {
  id: number;
  userId: number;
  token: string;
  createdAt: string;
  isValid: boolean;
};
