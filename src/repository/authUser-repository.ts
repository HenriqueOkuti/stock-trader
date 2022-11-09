import db from '../config/database.js';
import { userInfoType } from '../protocols/userInfoType.js';
import bcrypt from 'bcrypt';

export function insertUser(user: userInfoType) {
  const SALT: number = 10;
  const passwordHash: string = bcrypt.hashSync(user.password, SALT);
  return db.query(
    `insert into users (name, "email", "password") values ($1, $2, $3);`,
    [user.name, user.email, passwordHash]
  );
}
