import { Request, Response } from 'express';
import IUserLogin from '../interfaces/IUserLogin';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  constructor(private _service: LoginServices) {
    this._service = _service;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const user: IUserLogin = req.body;

    const token = await this._service.login(user);

    return res.status(200).json({ token });
  }
}
