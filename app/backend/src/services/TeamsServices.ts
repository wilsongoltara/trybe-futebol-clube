import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/TeamsModel';
import ErrorStatusMessage from '../middlewares/ErrorStatusMessage';
import statusHttp from '../utils/statusHttp';

export default class TeamsServices {
  constructor(private _model = Teams) { }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._model.findAll();

    return teams;
  }

  async getTeamById(id: number): Promise<ITeams> {
    const team = await this._model.findByPk(id);

    if (!team) throw new ErrorStatusMessage('Not found team with such id!', statusHttp.notFound);

    return team;
  }
}
