import { User } from './user.model';

const getAllUser = async () => {
  const users = await User.find();
  return users;
};

export const UserService = {
  getAllUser,
};
