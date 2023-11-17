import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
  },
  avatar: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>('User', userSchema);
