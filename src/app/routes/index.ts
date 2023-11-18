import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AuthRouter } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
