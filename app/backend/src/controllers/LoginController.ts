import { Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import IUserLogin from '../interfaces/IUserLogin';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  constructor(private _service: LoginServices) {
    this._service = _service;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const user: IUserLogin = req.body;
    const token = await this._service.login(user);

    return res.status(statusHttp.ok).json({ token });
  };

  validate = (req: Request, res: Response) => {
    const { user } = req.body;

    return res.status(statusHttp.ok).json({ role: user.role });
  };
}
