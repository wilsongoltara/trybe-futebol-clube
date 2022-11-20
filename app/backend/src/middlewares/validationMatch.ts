import { NextFunction, Request, Response } from 'express';
import messages from '../utils/Messages';
import statusHttp from '../utils/statusHttp';
import TeamsServices from '../services/TeamsServices';
import ErrorStatusMessage from './ErrorStatusMessage';

const validationMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (Number(homeTeam) === Number(awayTeam)) {
    throw new ErrorStatusMessage(messages.equalsTeam, statusHttp.unprocessable);
  }

  const service = new TeamsServices();

  const home = await service.getTeamById(Number(homeTeam));
  const away = await service.getTeamById(Number(awayTeam));

  if (!away || !home) {
    throw new ErrorStatusMessage(messages.notFoundTeam, statusHttp.notFound);
  }

  next();
};

export default validationMatch;
