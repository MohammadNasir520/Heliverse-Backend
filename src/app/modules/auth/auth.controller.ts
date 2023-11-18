import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.login(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successful',
    data: result,
  });
});

export const AuthController = {
  login,
};
