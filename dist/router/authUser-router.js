import { createUser, logUser } from '../controller/index.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/index.js';
import { createUserSchema, loginUserSchema } from '../schemas/index.js';
var authUserRouter = Router();
authUserRouter
    .post('/signin', validateSchema(createUserSchema), createUser)
    .post('/login', validateSchema(loginUserSchema), logUser);
export { authUserRouter };
