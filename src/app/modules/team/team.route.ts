import express from 'express';
import { TeamController } from './team.controller';
const router = express.Router();

router.post('/', TeamController.createTeam);
router.post('/add-member', TeamController.addMemberToTeam);

export const TeamRouter = router;
