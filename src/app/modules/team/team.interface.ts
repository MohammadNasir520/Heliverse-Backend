import { Types } from 'mongoose';

export type ITeam = {
  title: string;
  members: Types.ObjectId[];
};
