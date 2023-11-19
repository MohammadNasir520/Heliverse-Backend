import { Types } from 'mongoose';

export type ITeam = {
  title: string;
  creator: Types.ObjectId;
  members: Types.ObjectId[];
};
