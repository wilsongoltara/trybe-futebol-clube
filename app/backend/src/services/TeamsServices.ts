import errorMessages from '../utils/errorMessages';
import ErrorStatusMessage from '../middlewares/ErrorStatusMessage';
import ITeams from '../interfaces/ITeams';
import statusHttp from '../utils/statusHttp';
import Teams from '../database/models/TeamsModel';

export default class TeamsServices {
  constructor(private _model = Teams) { }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._model.findAll();

    return teams;
  }

  async getTeamById(id: number): Promise<ITeams> {
    const team = await this._model.findByPk(id);

    if (!team) throw new ErrorStatusMessage(errorMessages.notFoundTeam, statusHttp.notFound);

    return team;
  }
}
