import { Request, Response } from 'express';

import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  constructor(private _leaderboardServices: LeaderboardServices) {
    this._leaderboardServices = new LeaderboardServices();
  }

  getAllByHome = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardByHome = await this._leaderboardServices.getAllByHome();
    return res.status(200).json(leaderboardByHome);
  };

  getAllByAway = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardByAway = await this._leaderboardServices.getAllByAway();
    return res.status(200).json(leaderboardByAway);
  };

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this._leaderboardServices.getAll();
    return res.status(200).json(leaderboard);
  };
}
