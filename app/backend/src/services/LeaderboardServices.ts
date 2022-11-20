import sequelize from '../database/models';

import leaderboardAwayQuery from '../utils/leaderboardAwayQuery';
import leaderboardHomeQuery from '../utils/leaderboardHomeQuery';
import leaderboardQuery from '../utils/leaderboardQuery';

export default class LeaderboardServices {
  constructor(private model = sequelize) {}

  async getAllByHome() {
    const [leaderboardByHome] = await this.model.query(leaderboardHomeQuery);
    return leaderboardByHome;
  }

  async getAllByAway() {
    const [leaderboardByAway] = await this.model.query(leaderboardAwayQuery);
    return leaderboardByAway;
  }

  async getAll() {
    const [leaderboard] = await this.model.query(leaderboardQuery);
    return leaderboard;
  }
}
