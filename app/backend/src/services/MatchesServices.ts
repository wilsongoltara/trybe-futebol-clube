import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesServices {
  constructor(private _model = Matches) { }

  async getListMatches(): Promise<Matches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async getMatchesInProgress(inProgress: boolean): Promise<Matches[]> {
    const matchesInProgress = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesInProgress;
  }
}
