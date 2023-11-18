import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AuthRouter } from '../modules/auth/auth.routes';
import { TeamRouter } from '../modules/team/team.route';

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
  {
    path: '/teams',
    route: TeamRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
