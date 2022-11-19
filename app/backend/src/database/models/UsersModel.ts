import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  email!: string;
  password!: string;
  role!: string;
  username!: string;
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING(100),
    },
    role: {
      allowNull: false,
      type: STRING(100),
    },
    email: {
      allowNull: false,
      type: STRING(100),
    },
    password: {
      allowNull: false,
      type: STRING(100),
    },
  },
  {
    modelName: 'Users',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

export default Users;
