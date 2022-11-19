import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');
import statusHttp from '../utils/statusHttp';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusHttp.unauthorized).json({
      message: 'Token not found',
    });
  }

  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    req.body = { ...req.body, user: payload };
    return next();
  } catch (_error) {
    return res.status(statusHttp.unauthorized).json({
      message: 'Token must be a valid token',
    });
  }
};

export default auth;
