import dotenv from 'dotenv';
dotenv.config();
var PORT = process.env.PORT;
var CONNECTION_STRING = process.env.DATABASE_URL;
export { PORT, CONNECTION_STRING };
