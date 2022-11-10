import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.DATABASE_URL;

export { PORT, CONNECTION_STRING };
