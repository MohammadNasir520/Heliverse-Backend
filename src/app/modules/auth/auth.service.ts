import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IUserLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const login = async (payload: IUserLogin) => {
  const isExist = await User.findOne({ email: payload.email });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'invalid user');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Password');
  }

  const accessToken = jwtHelpers.createToken(
    {
      userId: isExist._id,
      email: isExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const AuthService = {
  login,
};
