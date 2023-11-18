import { User } from '../user/user.model';
import { ITeam } from './team.interface';
import { Team } from './team.model';

const createTeam = async (payload: ITeam) => {
  const team = await Team.create(payload);
  return team;
};
const addMemberToTeam = async (userId: string, teamId: string) => {
  const userUpdate = await User.findOneAndUpdate(
    { _id: userId },
    { team: teamId },
    { new: true }
  );
  console.log(userUpdate);
  const team = await Team.findOneAndUpdate(
    { _id: teamId },
    { $addToSet: { members: userId } },
    { new: true }
  ).populate('members');

  return team;
};

export const TeamService = {
  createTeam,
  addMemberToTeam,
};
