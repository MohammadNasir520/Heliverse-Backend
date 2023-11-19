import { Schema, model } from 'mongoose';
import { ITeam } from './team.interface';

const teamSchema = new Schema<ITeam>(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
