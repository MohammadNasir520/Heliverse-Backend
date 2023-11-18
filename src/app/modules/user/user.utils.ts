import { User } from './user.model';

export const generateIncrementalUserId = async () => {
  const lastUser = await User.findOne({}).sort({ id: 'desc' });
  const lastUserId = lastUser?.id;

  const incrementId = lastUserId + 1;
  return incrementId;
};
