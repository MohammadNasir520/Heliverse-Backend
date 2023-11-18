import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getSingleUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);

export const UserRouter = router;
