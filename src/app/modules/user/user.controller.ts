import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IUser } from './user.interface';
import { usersFilterableFields } from './user.constant';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
  }
);

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filterOptions = pick(req.query, usersFilterableFields);

    const result = await UserService.getAllUser(
      paginationOptions,
      filterOptions
    );
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result.data,
      message: 'users retrieved successfully',
      meta: result.meta,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user retrived successfully',
      data: result,
    });
  }
);
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user update successfully',
      data: result,
    });
  }
);
const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user deleted successfully',
      data: result,
    });
  }
);

export const UserController = {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
