import { compare } from 'bcryptjs';
import IUserLogin from '../interfaces/IUserLogin';
import Users from '../database/models/UsersModel';
import generateToken from '../utils/generateToken';

const invalidFields = 'Incorrect email or password';

export default class LoginServices {
  constructor(private _model = Users) { }

  async login(user: IUserLogin): Promise<string> {
    const { email, password } = user;

    const validUser = await this._model.findOne({ where: { email } });

    if (!validUser) throw new Error(invalidFields);

    const validPassword = await compare(password, validUser.password);

    if (!validPassword) throw new Error(invalidFields);

    const token = generateToken(validUser.id, validUser.role);

    return token;
  }
}
