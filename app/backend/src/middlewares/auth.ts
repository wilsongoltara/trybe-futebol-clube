import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');
import messages from '../utils/Messages';
import statusHttp from '../utils/statusHttp';

const { JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusHttp.unauthorized).json({
      message: messages.notFoundToken,
    });
  }

  try {
    const payload = jwt.verify(authorization, JWT_SECRET as string);
    req.body = { ...req.body, user: payload };
    return next();
  } catch (_error) {
    return res.status(statusHttp.unauthorized).json({
      message: messages.invalidToken,
    });
  }
};

export default auth;
