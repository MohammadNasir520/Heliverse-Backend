import { Schema, Types, model } from 'mongoose';
import { ITeam } from './team.interface';

const teamSchema = new Schema<ITeam>({
  title: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Team = model<ITeam>('Team', teamSchema);
