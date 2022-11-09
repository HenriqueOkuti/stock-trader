//import { createUser } from './controller/index.js';
import { Router } from 'express';
var authUserRouter = Router();
authUserRouter
    .post('/signin', function () { }) //creates new user
    .post('/login', function () { }) //logs user
;
export { authUserRouter };
