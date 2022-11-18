import { NextFunction, Request, Response } from 'express';
import errorMessages from '../utils/errorMessages';
import IUserLogin from '../interfaces/IUserLogin';
import statusHttp from '../utils/statusHttp';

const validationLogin = (req: Request, res: Response, next: NextFunction) => {
  const user: IUserLogin = req.body;

  if (!user.email || !user.password) {
    return res.status(statusHttp.badRequest).json({
      message: errorMessages.allFields,
    });
  }

  next();
};

export default validationLogin;
