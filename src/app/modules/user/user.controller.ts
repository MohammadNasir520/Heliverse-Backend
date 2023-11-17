import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUser();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

export const UserController = {
  getAllUser,
};
