import { createUser } from '../controller/index.js';
import { Router } from 'express';
import { validateNewUser } from '../middleware/authUser-middleware.js';

const authUserRouter = Router();
authUserRouter
    .post('/signin', validateNewUser, createUser)  //creates new user
    .post('/login', () => {})   //logs user
    ;

export {authUserRouter}