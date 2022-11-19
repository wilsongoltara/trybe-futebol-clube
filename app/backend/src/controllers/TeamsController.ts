import { Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import TeamsServices from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _service: TeamsServices) {
    this._service = _service;
  }

  getTeams = async (_req: Request, res: Response) => {
    const allTeams = await this._service.getAllTeams();

    return res.status(statusHttp.ok).json(allTeams);
  };

  getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._service.getTeamById(Number(id));

    return res.status(statusHttp.ok).json(team);
  };
}
