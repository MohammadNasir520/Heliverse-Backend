import { Types } from 'mongoose';

export type ITeam = {
  _id?: Types.ObjectId;
  title: string;
  creator: Types.ObjectId;
  members: Types.ObjectId[];
};
