import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesServices {
  constructor(private _model = Matches) {}

  async createMatch(match: IMatches): Promise<IMatches> {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals } = match;

    const newMatch = await this._model.create({
      awayTeam,
      awayTeamGoals,
      homeTeam,
      homeTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }

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

  async updateProgress(id: number): Promise<void> {
    await this._model.update({ inProgress: false }, { where: { id } });
  }
}
