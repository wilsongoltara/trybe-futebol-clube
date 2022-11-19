import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/TeamsModel';

export default class TeamsServices {
  constructor(private _model = Teams) { }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._model.findAll();

    return teams;
  }
}
