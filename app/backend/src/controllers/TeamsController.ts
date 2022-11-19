import { Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import TeamsServices from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _service: TeamsServices) {
    this._service = _service;
  }

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this._service.getAllTeams();

    return res.status(statusHttp.ok).json(allTeams);
  };
}
