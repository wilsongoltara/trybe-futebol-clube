import { Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _service: MatchesServices) {
    this._service = _service;
  }

  getAllMatches = async (_req: Request, res: Response) => {
    const listMatches = await this._service.getListMatches();

    return res.status(statusHttp.ok).json(listMatches);
  };
}
