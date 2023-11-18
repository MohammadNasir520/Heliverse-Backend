import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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
  // console.log('keyes', Object.keys(filtersData)); //keyes [ 'domain', 'available' ]
  // console.log('entries', Object.entries(filtersData)); //entries [ [ 'domain', 'finance' ], [ 'available', 'true' ] ]

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

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

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

const getSingleUser = async (id: string) => {
  const user = await User.findOne({ id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  return user;
};

export const UserService = {
  getAllUser,
  getSingleUser,
};
