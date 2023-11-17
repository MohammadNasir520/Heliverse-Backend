import express from 'express';
import { UserController } from '../user/user.controller';

const router = express.Router();

router.get('/', UserController.getAllUser);

export const UserRouter = router;
