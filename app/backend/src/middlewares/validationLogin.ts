import { NextFunction, Request, Response } from 'express';
import messages from '../utils/Messages';
import IUserLogin from '../interfaces/IUserLogin';
import statusHttp from '../utils/statusHttp';

const validationLogin = (req: Request, res: Response, next: NextFunction) => {
  const user: IUserLogin = req.body;

  if (!user.email || !user.password) {
    return res.status(statusHttp.badRequest).json({
      message: messages.allFields,
    });
  }

  next();
};

export default validationLogin;
