import { Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import MatchesServices from '../services/MatchesServices';
import messages from '../utils/Messages';

export default class MatchesController {
  constructor(private _service: MatchesServices) {
    this._service = _service;
  }

  addMatch = async (req: Request, res: Response) => {
    const match = req.body;

    const newMatch = await this._service.createMatch(match);

    res.status(statusHttp.created).json(newMatch);
  };

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      const listMatches = await this._service.getListMatches();
      return res.status(statusHttp.ok).json(listMatches);
    }

    const listMatchesInProgress = await this._service.getMatchesInProgress(
      inProgress === 'true',
    );
    return res.status(statusHttp.ok).json(listMatchesInProgress);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.updateProgress(Number(id));

    return res.status(statusHttp.ok).json({ message: messages.finished });
  };
}
