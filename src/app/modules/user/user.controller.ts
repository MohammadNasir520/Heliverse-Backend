import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IUser } from './user.interface';

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await UserService.getAllUser(paginationOptions);
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result.data,
      message: 'users retrieved successfully',
      meta: result.meta,
    });
  }
);

export const UserController = {
  getAllUser,
};
