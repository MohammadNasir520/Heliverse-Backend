import express from 'express';
import { TeamController } from './team.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/', auth(), TeamController.createTeam);
router.post('/add-member', TeamController.addMemberToTeam);
router.get('/', auth(), TeamController.getAllTeamByUserId);

export const TeamRouter = router;
