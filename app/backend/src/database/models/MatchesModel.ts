import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';

class Matches extends Model {
  id!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  inProgress!: number;
}

Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: 'Matches',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

export default Matches;
