import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { TeamService } from './team.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TeamService.createTeam(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'team created successfully',
      data: result,
    });
  }
);
const addMemberToTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, teamId } = req.body;
    const result = await TeamService.addMemberToTeam(userId, teamId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'member added to team  successfully',
      data: result,
    });
  }
);

export const TeamController = {
  createTeam,
  addMemberToTeam,
};
