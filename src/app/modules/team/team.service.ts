import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ITeam } from './team.interface';
import { Team } from './team.model';
import { Types } from 'mongoose';

const createTeam = async (payload: ITeam, userId: Types.ObjectId) => {
  payload.creator = userId;

  const user = await User.findById(payload?.members[0]);
  // if (!user?.available) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'user is not available for making team'
  //   );
  // }
  console.log('user', user);

  const team = await (await Team.create(payload)).populate('creator');
  console.log('new team', team);

  for (const memberId of payload.members) {
    const userUpdate = await User.findByIdAndUpdate(memberId, {
      team: team._id,
      available: false,
    });
    console.log('user Update', userUpdate);
  }

  const UpdateCreator = await User.updateOne(
    { _id: userId },
    { $addToSet: { team: (await team)._id } },
    { upsert: true, new: true }
  );
  console.log('uupdate creator ', UpdateCreator);

  return team;
};
const addMemberToTeam = async (userId: string, teamId: string) => {
  const isUserExist = await User.findOne({ _id: userId });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (isUserExist.available === false) {
    throw new ApiError(httpStatus.NOT_FOUND, 'this user is not available');
  }

  const isTeamExist = await Team.findOne({ _id: teamId }).populate('members');

  if (!isTeamExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }

  const teamUniqueDomain = new Set();

  isTeamExist?.members?.forEach((member: any) => {
    teamUniqueDomain.add(member.domain);
  });

  const teamUniqueDomainArray = Array.from(teamUniqueDomain);

  if (teamUniqueDomainArray.includes(isUserExist?.domain)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This users domain ${isUserExist?.domain} already  exist in that team`
    );
  }
  const userUpdate = await User.findOneAndUpdate(
    { _id: userId },
    { team: teamId, available: false },
    { new: true }
  );

  const team = await Team.findOneAndUpdate(
    { _id: teamId },
    { $addToSet: { members: userId } },
    { new: true }
  ).populate('members');

  return {
    team,
    userUpdate,
  };
};

const getAllTeamByUserId = async (id: string) => {
  const teams = await Team.find({ creator: id }).populate('members');
  if (!teams) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you haven't create any team yet "
    );
  }
  return teams;
};

export const TeamService = {
  createTeam,
  addMemberToTeam,
  getAllTeamByUserId,
};
