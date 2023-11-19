import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { TeamService } from './team.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;

    const result = await TeamService.createTeam(req.body, userId);
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
const getAllTeamByUserId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;
    const result = await TeamService.getAllTeamByUserId(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'teams retrieved for this user successfully  successfully',
      data: result,
    });
  }
);

export const TeamController = {
  createTeam,
  addMemberToTeam,
  getAllTeamByUserId,
};
