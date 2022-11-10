import pg from 'pg';

type connection = {
  connectionString: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
};

const { Pool } = pg;
const connection: connection = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
const db = new Pool(connection);
export { db };
