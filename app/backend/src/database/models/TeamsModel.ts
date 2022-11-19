import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING(100),
    },
  },
  {
    modelName: 'Teams',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
