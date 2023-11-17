import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelper } from '../../helpers/paginationHelper';
import { usersSearchableFields } from './user.constant';
import { IUserFilterableOptions } from './user.interface';
import { User } from './user.model';

const getAllUser = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IUserFilterableOptions
) => {
  const { page, limit, skip } =
    paginationHelper.calculationPagination(paginationOptions);

  const { searchTerm, ...filtersData } = filterOptions;
  console.log(typeof searchTerm, filtersData);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: usersSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //   const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const users = await User.find(whereCondition).skip(skip).limit(limit);
  const total = await User.countDocuments(whereCondition);
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
