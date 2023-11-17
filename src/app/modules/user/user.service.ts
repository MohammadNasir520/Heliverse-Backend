import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelper } from '../../helpers/paginationHelper';
import { User } from './user.model';

const getAllUser = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip } =
    paginationHelper.calculationPagination(paginationOptions);
  console.log(page, limit, skip);
  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();
  return {
    data: users,
    meta: {
      limit,
      page,
      total,
    },
  };
};

export const UserService = {
  getAllUser,
};
