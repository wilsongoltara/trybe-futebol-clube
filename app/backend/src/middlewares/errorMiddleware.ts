import { ErrorRequestHandler } from 'express';
import statusHttp from '../utils/statusHttp';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(statusHttp.internalError).json({ message: err.message });
};

export default errorMiddleware;
