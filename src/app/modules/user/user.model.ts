/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

userSchema.pre('save', async function (next) {
  try {
    // @ts-ignore
    this.password = await bcrypt.hash(
      // @ts-ignore
      this.password,
      Number(config.bycrypt_salt_rounds)
    );
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = model<IUser>('User', userSchema);
