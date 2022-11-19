import { compare } from 'bcryptjs';
import IUserLogin from '../interfaces/IUserLogin';
import Users from '../database/models/UsersModel';
import Token from '../utils/generateToken';
import ErrorStatusMessage from '../middlewares/ErrorStatusMessage';
import statusHttp from '../utils/statusHttp';

const invalidFields = 'Incorrect email or password';

export default class LoginServices {
  constructor(private _model = Users) {}

  async login(user: IUserLogin): Promise<string> {
    const { email, password } = user;

    const validUser = await this._model.findOne({ where: { email } });

    if (!validUser) { throw new ErrorStatusMessage(invalidFields, statusHttp.unauthorized); }

    const validPassword = await compare(password, validUser.password);

    if (!validPassword) { throw new ErrorStatusMessage(invalidFields, statusHttp.unauthorized); }

    const token = Token.generateToken(validUser.id, validUser.role);

    return token;
  }
}
